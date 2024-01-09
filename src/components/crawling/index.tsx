import axios from 'axios'
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import credential from "../../../key.json"

function Crawling() {
    const cheerio = require('cheerio')

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

    const loadGoogleDocArtist = async () => {
        try {
            const result = new Array()
            const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
            await doc.loadInfo();
            const sheet = doc.sheetsByTitle['Artist']
            const rows = await sheet.getRows()
            for (let i = 0; i < rows.length; i++) {
                result[i] = {'index': rows[i]._rowNumber, 'id': rows[i]._rawData[1], 'artist': rows[i]._rawData[2]}
            }
            console.log(result)
            return result;
        } catch (err) {
            console.error("Sheet Load Rows Error:", err)
        }
    }
    // loadGoogleDocArtist()

    const addDocList = async (sheetName: string, data: any) => {
        try {
            const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
            await doc.loadInfo();
            const sheet = await doc.sheetsByTitle[sheetName]
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
    const addDocData = async (sheetName: string, data: any) => {
        try {
            const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
            await doc.loadInfo();
            const sheet = await doc.sheetsByTitle[sheetName]
            const rows = await sheet.getRows()
            sheet.addRows(data)

        } catch (err) {
            console.error("Sheet Load Rows Error:", err)
        }
    }
    // addGoogleDoc()

    // Crawler
    // - Chart
    const getChart = async () => {
        const chartInfo = new Array();
        const title: string[] = [];
        const artist: string[] = [];
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
            addDocList('Chart', chartInfo)
            return chartInfo;
        } catch (err) {
            console.error('axios error', axios)
            console.error(err)
        }
    }
    // getChart()

    // - Artist
    const getArtist = async () => {
        try {
            const regex = /[^0-9]/g

            const artistList = new Array()
            const artistId: string[] = [];
            const artistName: string[] = [];

            const html = await axios.get('https://www.melon.com/chart/');
            const $ = cheerio.load(html.data)
            $('.checkEllipsis > a').each(function (this: any, idx: number) {
                const id = $(this).attr("href").replace(regex, "");
                artistId[idx] = id;
                const name = $(this).text();
                artistName[idx] = name;
            })
            // TODO : for of로 리팩토링
            // forEach는 await 가 안먹힘
            for (let i = 0; i < artistId.length; i++) {
                artistList[i] = {'index': i ,'id': artistId[i], 'artist': artistName[i] }
            }
            const result = duplication(artistList);

            for (let i = 0; i < result.length; i++) {
                const assignDetail = await artistDetail(result[i].id)
                Object.assign(result[i], assignDetail[0])
            }
            console.log(result)
            // TODO : 돌아가면서 하나씩 넣어보기
            // TODO : VPN으로 IP 우회하기
            // TODO : 프록시 서버 사용해보기

            addDocList('Artist', result)

            return result;
        } catch (err) {
            console.error('axios error', axios)
            console.error(err)
        }
    }
    const duplication = (data: any[]) => {
        const duplicate = data.filter((el, i) => {
            return data.findIndex((e) => el.id === e.id) === i
        })
        return duplicate;
    }
    // getArtist()

    const artistDetail = async (id: any) => {
        const html = await axios.get(`https://www.melon.com/artist/detail.htm?artistId=${id}`);
        const $ = cheerio.load(html.data)
        const result = new Array()

        const award = $('#d_artist_award').text().replace(/\t|\n+/g, "")
        const article = $('#d_artist_intro').text().replace(/\t|\n+/g, "")

        const debutSong: any[] = [];
        $('.debutsong_info > dl > dt > a').each(function(this: any) {
            debutSong.push($(this).text())
        })

        const info = new Array()
        const infoTitle: any[] = [];
        const infoContent: any[] = [];
        $('.section_atistinfo03 > dl').each(function(this: any) {
            $(this).find('dt').each(function(this: any, idx: number) {
                infoTitle.push($(this).text())
            })
            $(this).find('dd').each(function(this: any, idx: number) {
                infoContent.push($(this).text().replace(/\t|\n+/g, ""))
            })
            for (let i = 0; i < infoTitle.length; i++) {
                info[i] = {[infoTitle[i]]: infoContent[i]}
            }
        })

        result[0] = {'debutSong': debutSong, 'article': article, 'award' : award, 'info': info}
        return result;
    }
    // artistDetail('236797')

    return (
        <div>
            Crawling
        </div>
    )
}

export default Crawling