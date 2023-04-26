/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val) // the variable for the new value we want to push

    if (this.head === null ){ // if there is nothing in the list and therefor the head is null 
      this.head = newNode // we initialize that newNode to the head
      this.tail = newNode // and the tail 
    }
    else{ // if there are values in the node then we assign the newNode to the .next value of the tail
      this.tail.next= newNode // we take the current tail and make the .next point to the newNode
      this.tail = newNode // and now we need to update the newNode is the new tail 
    }
    this.length++; // we gotta update the length property in our constructor
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val)
    if (this.head === null ){ // if there is nothing in the list and therefor the head is null 
      this.head = newNode // we initialize that newNode to the head
      this.tail = newNode // and the tail 
    }
    else{
      newNode.next = this.head //  we want to set the .next Node to be the one we have at the head currently
      this.head = newNode // and set the head Node to be the new one we pass in
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    let current = this.head // initialize a variable called current which takes the head of the list
    // console.log("CURRETTT", current, "THIS.HEADD", this.head )

    if(this.head=== null){ // if there is nothing in the list we return an error
      return "nothing in list!"
    }

    if(this.head === this.tail){ // if there is only ONE node in the list AKA the head and tail are the same, 
      this.head = null; // we set both those values to null and decrement the length
      this.tail = null;
      this.length --;
      return current.val // we return the value of the removed node
    }

    while(current.next !== this.tail){// keep re assigning current variable to the next one if we have not found the node where the next value is the last one (.tail)
      current = current.next
    }
    
    // if we have avoided all the conditonals and we found the current.next to be the this.tail 
    const tailValue = this.tail.val // first we want to assign a const variable to hold the value of the tail that we want to remove
    this.tail = current; // then the tain is going to be assigned to the current 
    this.tail.next = null; // the .next is null since we are removing the last node
    this.length--; // decrement the length
    return tailValue // return the value of the tail from our const variable
  
  }

  /** shift(): return & remove first item. */

  shift() {

    if (!this.head){
      return null
    }
     if(this.head === this.tail){ // if there is only ONE node in the list AKA the head and tail are the same, 
      this.tail = null; // just setting this.tail to null because if we add the this.head = null it will not render the next code this.head.val and will point at a undefined val
     }

    const headVal = this.head.val
    // console.log(headVal, "HEAD VAL")
    this.head = this.head.next
    // console.log(this.head, "NEW HEAD")
    this.length--;
    return headVal

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head; // initializing the current to the first node (this.head)
    let indexCounter = 0; // initializing the indexCounter to 0 - this represents the idx 

    if (idx < 0 || idx > this.length ){
      return "index is out of range"
    }

    while (indexCounter < idx){ // as long as we have not reached the idx we are trying to get (the counter is smaller than the idx)
      current = current.next; // we are going to keep reassigning the current variable to the next one
      indexCounter ++; // and add to our counter
    }

    // if we our counter reaches the idx we want then we recturn that current value
    return current.val;

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) { 
    let current = this.head;
    let indexCounter = 0; 

    if (idx < 0 || idx > this.length ){
      return "index is out of range"
    }

    while (indexCounter < idx){
      current = current.next;
      indexCounter++;
    }

    current.val = val // similar to the getAt function except this part where we assign the val of the current (which is found by the idx) to the val we pass in

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    let current = this.head;
    let indexCounter = 0; 

    if (idx < 0 || idx > this.length ){
      return "index is out of range"
    }

    if (idx === 0){ // if the idx is 0 we are just calling the unshift fucntion thats alreayd defined to all the value to the head to the list
     return this.unshift(val)
    }
    if(idx === this.length){ // if the idx is the length of the list we are calling the .push to add the value to the tail of the list
      return this.push(val)
    }

    while (indexCounter < idx-1){ // here we are incrementing counter and reassigning current until we get the idx-1 AKA the idx of the node prior to the one passed in
      current = current.next;
      indexCounter++;
    }

    let newNode = new Node(val) 
    // current is referring to the node that comes BEFORE the idx we want to insert it at
    newNode.next = current.next // we set the .next value of the newNode to the current.next (current is referring to the node that comes BEFORE the idx we want to insert it at so the .next of that is the idx value)
    current.next = newNode // we also want to set the current.next( aka the node before the idx we passed in) to be the newNode
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    let current = this.head;
    let indexCounter = 0; 

    if (idx < 0 || idx > this.length ){
      return "index is out of range"
    }

    if (idx === 0){ 
     return this.shift()
    }
    if(idx === this.length){ 
      return this.pop()
    }

    while (indexCounter < idx-1){  // here we are incrementing counter and reassigning current until we get the idx-1 AKA the idx of the node prior to the one passed in
      current = current.next;
      indexCounter++;
    }

    // current is referring to the node that comes BEFORE the idx we want to remove
    const removeVal = current.next.val // assign value of removeVal variable to to the value of the idx we want to remove (aka current.next cuz current is the node before)
    current.next = current.next.next; // set the next value of the current to the next next (becuase we are removing the next)
    this.length--; 
    return removeVal

  }

  /** average(): return an average of all values in the list */

  average() {

    let current = this.head;
    let total = 0;
   
    if(this.length === 0){
        return 0
      }
      
    while (current){
      total += current.val
      current = current.next
      console.log(total, "TOTAL", this.length, "LENGTH")
    }
    let average = total/(this.length)
    console.log(average, "AVEEE")
    return average
    
  }
}

module.exports = LinkedList;
