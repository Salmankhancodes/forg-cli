let inputArr= process.argv.slice(2);
let command=inputArr[0];
let path = require("path")
let fs = require("fs")

let types={
    media:["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents:["docx","doc","pdf","xlsx","xls","odt","odp","odg","odf","txt","ps","tex"],
    app:["exe","dmg","pkg","deb","js"]
}


switch(command){
    case "tree":
        treefn(inputArr[1]);
        break;

    case "organize":
        organizefn(inputArr[1]);
        break;

    case "help":
        helpfn();
        break;

    }

function treefn(){
    console.log("Tree command in process");
}
function organizefn(dirPath){
    let destPath=undefined;
    if(dirPath == undefined){
        console.log("Please enter directory path");
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);

        if(doesexist == false){
            console.log("Please enter a valid directory path");
            return;
        }
        else{
            destPath = path.join(dirPath,"Organized_files");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
        }
        organizeHelper(dirPath,destPath);
    }
}
function helpfn(){
    console.log(`
    
    👉 node tree "dirPath"- for generating tree structure of current directory
    👉 node organze "dirPath" - for organzing files into different folder according to their extensions
    👉 node help - for information about different commands 
    `
    );
}
function organizeHelper(src,dest){

    let childnames=fs.readdirSync(src);
    for(let i=0;i<childnames.length;i++){
        
        let childaddress=path.join(src,childnames[i]);
        let isFile = fs.lstatSync(childaddress).isFile();
        if(isFile){
            let category = getcategory(childnames[i]);
            sendFiles(childaddress,dest,category);
       }
    }

};

function getcategory(name){
    let extension=path.extname(name).slice(1)
    
    for(let type in types){
        let typearray = types[type]

        for(let i=0;i<typearray.length;i++){
            if(typearray[i]==extension){
                return type;
            }
        }
    }
    return "others"
}

function sendFiles(srcFilePath,destPath,category){
    let categoryPath=path.join(destPath,category);
    
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }

    let fileName=path.basename((srcFilePath));
    let destFileName=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFileName);
    console.log("|",fileName,"|--------------Copied to--------------",category)
    
}









