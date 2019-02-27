const puppeteer = require('puppeteer');
const {TimeoutError} = require('puppeteer/Errors');
const selectors = require("./selectors.js");

var serviceAccount = require("ticketer-123-firebase-adminsdk-if9ia-39b0f30105.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ticketer-123.firebaseio.com"
});

let Data = {
    email: 'dadochudy@gmail.com',
    firstName: 'Dávid',
    lastName: 'Chudý',
    trainID: '2503374',
    stationFrom: 'Trnava',
    stationTo: 'Nováky',
    time: '7:00',
    date: 1 // date should be only 0,1,2... 0=today ....
}

async function getTickets(data) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ikvc.slovakrail.sk/mobile-sales-web/pages/connection/searchParam.xhtml');
    await page.setViewport({
        width: 375,
        height: 1500
    })
    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: './'
    });
    await fillInput(selectors.FROM, data.stationFrom);
    console.log(data.stationFrom);

    await page.waitFor(100);
    await fillInput(selectors.TO, data.stationTo);
    console.log(data.stationTo);
    await page.screenshot({
        path: 'cal_0.png'
    });
    if (data.date > 0) {
        await calendar(data.date);
        console.log(data.date);
    }

    await setTime (selectors.TIME ,data.time);
    await page.screenshot({
        path: 'cal_3.png'
    });
    await page.waitFor(100);
    await page.waitForSelector(selectors.PAGE_1_SUBMIT);
    await page.click(selectors.PAGE_1_SUBMIT);
    //await clickButton (selectors.PAGE_1_SUBMIT);
    console.log('nextPAGE');
    try {
        await page.waitForNavigation();
    } catch (err) {
        console.log('error not loaded new page '+ err);
    }

    await page.screenshot({
        path: 'cal_4.png'
    });
    console.log('oh god scraping');
    console.log(await scrapTickets ());
    console.log('scrapped');

    await browser.close();

    async function fillInput (selector, value) {

        await clickButton (selector);
        await page.keyboard.type(value, {delay: 100});
        await (await page.$( selector )).press( 'NumpadEnter' );  
    }

    async function dropDown (selector, value) {

        await page.waitForSelector(selector);
        await page.select(selector, value);
    }

    async function clickButton (selector) {

        await page.waitForSelector(selector);
        await page.click(selector);
    }

    async function setTime (selector ,time) {

        await page.waitForSelector (selector);

        await page.click(selector, { "clickCount": 3 });
        
        await page.keyboard.type(time, {delay: 100});
        // await page.evaluate ((selector, time) => {
            
        //     return document.querySelector(selector).value = time +'1';
            
        // }, selector, time);

        // await (await page.$( selector )).press( 'Backspace' );  
    }

    async function calendar (value) {
        let calendarInfo;
        
        await page.waitForSelector(selectors.CALENDAR);
            await page.click(selectors.CALENDAR);
        await page.screenshot({
            path: 'cal_1.png'
        });

        calendarInfo = getCalendarID(value);
        const calendarID = '#cl' + calendarInfo.id;

        if (calendarInfo.next) {

            await page.waitForSelector(selectors.CALENDAR_NEXT);
            await page.click(selectors.CALENDAR_NEXT);
            await page.screenshot({
                path: 'cal_2.png'
            });

            await page.waitForSelector(calendarID);
            await page.click(calendarID);
            await page.screenshot({
                path: 'cal_2_1.png'
            });

        } else {

            await page.waitForSelector(calendarID);
            await page.click(calendarID);
            await page.screenshot({
                path: 'cal_2.png'
            });

        }

    }

    async function scrapTickets () {
        let selector = '#searched_connections .i';

        await page.waitForSelector (selector);
        return await page.evaluate (() => {

            const results = Array.from (document.querySelectorAll ('#searched_connections .i'));

            return results.map (result => {

                let h2 = Array.from (result.querySelectorAll('h2'));
                h2 = h2.map (el => el.textContent.trim());

                let transfer = null;

                try {

                    transfer = Array.from (result.querySelectorAll('.prestup'));
                    transfer = transfer.map (el => el.textContent.trim());

                } catch (e) {

                    if (e instanceof TimeoutError) {
                        console.log(e);
                    }
                    console.log('nebol error asi ');
                }

                let time = Array.from (result.querySelectorAll('.time'));
                let departureTimes = time.map ( (el) => Array.from ( el.querySelectorAll('p:nth-child(1) strong span')).map ( val => val.textContent.trim())).flat ();
                
                let arrivalTimes = time.map ( (el) => Array.from ( el.querySelectorAll('p:nth-child(2) strong span')).map ( val => val.textContent.trim())).flat ();

                let departureDates = time.map ( (el) => Array.from ( el.querySelectorAll('p:nth-child(1) > span:nth-of-type(2)')).map ( val => val.textContent.trim())).flat ();

                let arrivalDates = time.map ( (el) => Array.from ( el.querySelectorAll('p:nth-child(2) > span:nth-of-type(2)')).map ( val => val.textContent.trim())).flat ();
                
                return {
                    trainNums: h2,
                    transfers: transfer,
                    departureTimes: departureTimes,
                    arrivalTimes: arrivalTimes,
                    departureDates: departureDates,
                    arrivalDates: arrivalDates,
                    duration: result.querySelector('.info p strong').textContent.trim()
                }
            });
        });
    }

};

getTickets(Data);

function getCalendarID(value) {

    const date = new Date();
    let callendarArr = generateMonth(date);
    let currentID = getID(callendarArr, date.getDate());
    const today = date.getDate();
    const offset = currentID - today;
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    if ((today + value) <= lastDayOfMonth) {

        return {
            id: (today + value + offset),
            next: false
        };

    } else {

        callendarArr = generateMonth(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        const nextMonthDay = (today + value) - lastDayOfMonth;

        return {
            id: getID(callendarArr, nextMonthDay),
            next: true
        };

    }
}

function getID(arr, day) {

    //flat works for node >v.11.00
    let id = arr.flat().findIndex(value => value === day);

    return id + 1;
}

function generateMonth(date) {

    const getLocalDay = (date) => {
        let day = date.getDay();

        if (day == 0) {
            day = 7;
        }
        return day;
    };
    const currentMonth = date.getMonth();
    const firstDate = new Date(date.getFullYear(), currentMonth, 1);
    const lastDate = new Date(date.getFullYear(), currentMonth + 1, 0);
    let month = [];
    let week = [];

    for (let i = 1; i < getLocalDay(firstDate); i++) {
        week.push('');
    }

    for (let i = 1; i <= lastDate.getDate(); i++) {
        const tmpDate = new Date(date.getFullYear(), currentMonth, i);
        if (getLocalDay(tmpDate) == 1) {
            if (week.length) month.push(week);
            week = [];
        }
        week.push(i);
    }

    for (let i = getLocalDay(lastDate); i < 7; i++) {
        week.push('');
    }

    if (week.length) month.push(week);
    return month;
};