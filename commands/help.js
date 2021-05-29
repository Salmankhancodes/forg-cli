
function helpfn(){
    console.log(`
    -> List of available commands are:    

        1️)  node tree "dirPath"- for generating tree structure of current directory

        2️  node organze "dirPath" - for organzing files into different folder according to their extensions

        3️)  node help - for information about different commands 
        
    `
    );
}
module.exports ={
    helpkey:helpfn
}