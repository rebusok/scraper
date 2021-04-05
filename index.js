import cherio from 'cheerio';
import chalk from 'chalk';
import {arrayFromPage} from './helpers/common'
import {getPageContent} from './helpers/puppeter';
import {slugify} from 'transliteration';
import listItemHandler from './handlers/listItemHandler'

const SITE = 'https://www.citilink.ru/catalog/noutbuki/?p=';
const pages = 1;
const urlHome = 'https://www.citilink.ru';
( async  function main(){
    try{
        for(const page of arrayFromPage(pages)){
            const url = `${SITE}${page}`
            const pageContent = await getPageContent(url)
            const $ = cherio.load(pageContent)
            let nouteItems = []   
                  
            $('.ProductCardHorizontal__title').each((i, header) => {
                const url = $(header).attr('href')
                const resUrl = urlHome + url
                const title = $(header).text()
                // console.log(url)
                nouteItems.push({
                    title,
                    resUrl,
                    subTitle: slugify(title)
                    
                })
                
            })  
            $('.ProductCardHorizontal__image').each((i, image) => {
                const url = $(image).attr('src')
                nouteItems[i] = {...nouteItems[i], image: url}
            })         
                    
            console.log(nouteItems)
            await listItemHandler(nouteItems)
            
        }
    }catch (e) {
        console.log(chalk.red(`An error \n`))
        console.log(e)
    }
})()