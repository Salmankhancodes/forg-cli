let path = require("path")
let fs = require("fs")

function treefn(dirPath){
    if(dirPath==undefined){
        treeHelper(process.cwd(), "");
        return;
    }
    else{
        if(fs.existsSync(dirPath)==false){
            console.log("Provided directory path does not exist.");
            return;
        }
        else{
            treeHelper(dirPath, "");
        }
    }

    console.log("Tree command in process");
}


function treeHelper(dirPath,indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    
    if(isFile == true){
        let fileName=path.basename(dirPath)
        console.log(indent+"|-----"+ fileName)
    }
    else{
        let dirName=path.basename(dirPath)
        console.log(indent+"|_____"+dirName);
        let children=fs.readdirSync(dirPath);

        for(let i=0;i<children.length;i++){
            let childPath = path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t")
        }
    }

}

module.exports={
    treekey:treefn
}