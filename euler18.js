//We can reduce the complexity of the problem by thinking the bigger triangle as a succession of triangles with 6 elements
//The route taken will be decided by which combination of the elements of each triangle gives the larger sum


//Array with out biiger triangle
let triangle = [
                            [75],
                          [95, 64],
                        [17, 47, 82],
                      [18, 35, 87, 10],
                    [20, 04, 82, 47, 65],
                  [19, 01, 23, 75, 03, 34],
                [88, 02, 77, 73, 07, 63, 67],
              [99, 65, 04, 28, 06, 16, 70, 92],
            [41, 41, 26, 56, 83, 40, 80, 70, 33],
          [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
        [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
      [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
  [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
[04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23]
]


//array with the values of X values in the inner arrays for the largest sum
let grandPath = sumGrandPath(triangle)

//add everything from the path we have.
let finalSum = 0
for(let i=0; i<triangle.length; i++){
  finalSum += triangle[i][grandPath[i]]
}
console.log(finalSum)

//function that figures out path depending on largest sum of sequencial smaller triangles (6 elements)
function sumGrandPath(triangle){
  let grandPath = []
  let localX = 0 //defined outside because it will change depending of the sum result
  for (let localY=0; localY<triangle.length-2; localY+=2){ //sequentially, jump 2 to start a new small triangle
    //small 6 triangle
    let smallLocal = littleArray(localY,localX,triangle)
    //path of smaller triangle
    let localPath= sumLittle(smallLocal, localX)

    //remove last element so that we don't repeat the last one when we add (where our new path starts)
    grandPath.pop()

    //append local path to big picture
    for (let i=0;i<localPath.length;i++){
      grandPath.push(localPath[i])
    }

    //redefine localX from the last elemnt of the grandPath, our new starting point for the next loop
    localX = grandPath[grandPath.length-1]
  }
  return grandPath
}


//function that creates little triangle array of 6 elements
//take a position in the array and the big triangle (array of arrays) as arguments
function littleArray(y, x, bigArr){
  let res = []
  let stepArray = [bigArr[y][x]]

  //first element - top of pyramid
  res.push(stepArray)
  stepArray = []
    //second element level
    for(let j=x;j<x+2;j++){
      stepArray.push(bigArr[y+1][j])
    }
    res.push(stepArray)
    stepArray = []

    //third element level
    for(let k = x; k<x+3; k++){
      stepArray.push(bigArr[y+2][k])
    }
    res.push(stepArray)
    stepArray =[]

    return res
}

//function that calculates larger sum withing the little array and returns path
//startX defines our starting X reference point in the largest triangle,
// so that it returns an abolute path in relation to the largest triangle
function sumLittle(arrArr,startX){
  let largest =0
  let first = arrArr[0][0]
  let path =[]

  for(i=0; i<2;i++){
    for(j=i;j<i+2;j++){
      let thisSum = first + arrArr[1][i] + arrArr[2][j]
      if (thisSum>largest){
        largest = thisSum
        path = [0+startX,i+startX,j+startX]
      }
    }
  }
  console.log(largest)
  return path
}
