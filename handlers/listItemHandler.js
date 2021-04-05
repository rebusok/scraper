import {getPageContent} from '../helpers/puppeter'
import cherio from 'cheerio';
import chalk from 'chalk';
import {formatPrise} from '../helpers/common';
import {saveData, saveArray} from '../handlers/save';
import {descripStr} from '../helpers/descrip';
export default async function listItemHandler(arrayItems) {
    try{
        let mainArr = {shopList:[]}
        for(const initialData of arrayItems) {
            console.log(chalk.green('Getiting data from') + chalk.green.bold(initialData.resUrl))
            const detailContent = await getPageContent(initialData.resUrl)
            if(!detailContent) return
            const $ = cherio.load(detailContent)
            // console.log(detailContent)
            // const image = $('.PreviewList__image').attr('src')
            const priseTesx = $('.ProductHeader__price-default_current-price').text()
            const prise= formatPrise(priseTesx)
            if(!prise) return
            const name = $('.Specifications__column_name').text()
            const value = $('.Specifications__column_value').text()
            const descrip = descripStr(name, value)

            console.log(initialData)
            mainArr = {shopList: [...mainArr.shopList, {
                ...initialData,
                // image, 
                prise,
                ...descrip
            }]}
            
        }
        await saveData(mainArr)
    }catch(e) {
        throw e
    }
}
