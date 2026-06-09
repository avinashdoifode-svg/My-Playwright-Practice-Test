import {test,expect,Locator} from '@playwright/test';

test('validate login',async({page})=>{
    
    await page.goto('');
     //const [download]=Promise.all([ page.waitForEvenet('download'), 
         page.locator('#name').click()]);

         const downloadpath="download/demo.txt";

        // download.saveAs(downloadpath);

        // const path=await download.path();
         console.log(path);

        // await page.locator('#name').setInputFiles('download/demo.txt');

       //  page.on('dialog',(dialog)=>{
          //  dialog.accept();
           // const dm:String=dialog.message();
            console.log(dm);

            await expect(dm).not.toBeFalsy(); fe
         })


});