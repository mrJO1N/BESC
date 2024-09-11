class Compiler {}







const programm = ',[.,]',
  input='hello',
  output='';

const programmDict={
  'start':`
    const input='',
      memory=Array(30_000).fill(0);
    let output='',
      pointer=0;
  `,
  'end':'return"he";',
  '+':'memory[pointer]++',
  '-':'memory[pointer]--',
  '>':'pointer++',
  '<':'pointer--',
  '.':'output+=String.fromCharCode(memory[pointer])',
  ',':`
  memory[pointer]=String(input).charCodeAt(nextInputIndex);
  nextInputIndex++;`
}
  for(const key in programmDict){
    programmDict[key]=programmDict[key].replace(/\B\s\B|\t+|\n/g,'')
  }
  

  function n(){
    const input='',
      memory=Array(30_000).fill(0);
      
    let output='',
      pointer=0;
  }
  
function compile(programm:string,input:string){
  let compiledToJs=''
  
  compiledToJs+=programmDict['start']
  
  for(const command of programm){
    
  }
  
  compiledToJs+=programmDict['end']
  
  return new Function(compiledToJs)
}

console.log(
  compile
  (programm,input)
  ()
);

