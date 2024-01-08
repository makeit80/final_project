import axios from 'axios'
import React, { useEffect } from 'react'

function Crawling() {
    useEffect(() => {
        const getHtml = async () => {
            const cheerio = require('cheerio')
            try {
                const html = await axios.get('https://www.melon.com/chart/');
                const $ = cheerio.load(html.data)
                console.log($)
            } catch (err) {
                console.error('axios error', axios)
                console.error(err)
            }
        }
        getHtml()
    })



    return (
        <div>

        </div>
    )
}

export default Crawling