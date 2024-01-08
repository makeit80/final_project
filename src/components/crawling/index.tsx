import axios from 'axios'
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import credential from "../../../key.json"

function Crawling () {
    
    // SpreadSheet
    const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
    const GOOGLE_SHEET_ID = '1qnpwCeWn_tvRXrrUGB9Nz6cefHWbnfXR8u6NPcKySW0'

    const jwt = new JWT({
        project_id: credential.project_id,
        keyId: credential.private_key_id,
        key: credential.private_key,
        email: credential.client_email,
        clientId: credential.client_id,
        scopes: SCOPES,
    })

    const loadGoogleDoc = async () => {
        try {
            const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
            await doc.loadInfo();
            const sheet = doc.sheetsById[0]
            const rows = await sheet.getRows()
            return rows;

        } catch (err) {
            console.error("Sheet Load Rows Error:", err)
        }
    }

    const addGoogleDoc = async () => {
        try {
            const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
            await doc.loadInfo();
            const sheet = await doc.sheetsByTitle['Chart']
            const data: any = await getHtml()
            const rows = await sheet.getRows()
            if (rows) {
                sheet.clearRows()
                sheet.addRows(data)
            } else {
                sheet.addRows(data)
            }
        } catch (err) {
            console.error("Sheet Load Rows Error:", err)
        }
    }
    // addGoogleDoc()

    // Crawler
    const getHtml = async () => {
        const cheerio = require('cheerio')
        const chartInfo = new Array();
        const title: string[] = [];
        const artist: string[] = [];
        console.log('getHTML')
        try {
            const html = await axios.get('https://www.melon.com/chart/');
            const $ = cheerio.load(html.data)
            $('.ellipsis.rank01 > span > a').each((idx : number, el : any) => {
                const titleInfo = el.children[0].data;
                title[idx] = titleInfo;
            });
            $('.checkEllipsis').each(function (this: any, idx: number) {
                const artistInfo = $(this).text();
                artist[idx] = artistInfo;
            });
            for (let i = 0; i < title.length; i++) {
                chartInfo[i] = {'rank' : i+1, 'title' : title[i], 'artist' : artist[i]}
            }
            return chartInfo;

        } catch (err) {
            console.error('axios error', axios)
            console.error(err)
        }
    }



    return (
        <div>
            Crawling  
        </div>
    )
}

export default Crawling