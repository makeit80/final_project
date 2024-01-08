import axios from 'axios'

function Crawling() {
    const getHtml = async () => {
        const cheerio = require('cheerio')
        const title = [];
        try {
            const html = await axios.get('https://www.melon.com/chart/');
            const $ = cheerio.load(html.data)
            for (let i = 0; i < 100; i++) {
                $('.ellipsis.rank01 > span > a').each((idx) => {
                    const titleInfo = $(this);
                    const titleInfoText = titleInfo.text();

                })
            }
            console.log('$$$$',$)
        } catch (err) {
            console.error('axios error', axios)
            console.error(err)
        }
    }
    getHtml()
    // useEffect(() => {

    //     getHtml()
    // })



    return (
        <div>
            Crawling
        </div>
    )
}

export default Crawling