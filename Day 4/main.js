const gpa = (mark = 33) => {
    if(mark >=80 &&  mark <= 100){
        console.log("A+");
        
    }else if(mark >= 79  && mark <= 70){
        console.log("A");
        
    }
    else if(mark == 33){
        console.log("C");
        
    }
    else{
        console.log("Fail");
        
    }
}

gpa()

