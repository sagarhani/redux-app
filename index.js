console.clear();

  // These are actoins
  // They must return an object with type property
  // Payload is optional

  const createPolicy = (name, amount) => {
    return { 
       type: "CREATE_POLICY",
       payload: {
          name: name,
          amount: amount
       }
    };
  };
  
  const deletePolicy = (name) => {
     return {
       type: "DELETE_POLICY",
       payload: {
         name: name
       }
     };
  };
  const createClaim = (name, amountToCollect) => {
    return {
      type: "CREATE_CLAIM",
      payload: {
        name: name,
        amountToCollect: amountToCollect
        
      }
    };
  };

// These are reducers
// Actions are dispatched to these reducers

const claimsHistory = ( oldListOfClaims = [], action ) => {
  // We care about the action
  if(action.type === "CREATE_CLAIM") {
    return [...oldListOfClaims, action.payload];
  }

  // don't care about action
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100 , action) => {
    if(action.type === "CREATE_CLAIM") {
        return bagOfMoney - action.payload.amountToCollect;
    } else if (action.type === "CREATE_POLICY"){
        return bagOfMoney + action.payload.amount; 
    }
        return bagOfMoney;
    
};

const policies = (listOfPolicies = [], action) => {
  if(action.type === "CREATE_POLICY") {
    return [... listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY"){
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};

const {createStore, combineReducers} = Redux; 

const ourDepartment = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
  
});

const store = createStore(ourDepartment);

// Creating a Policy
store.dispatch(createPolicy( 'Alex', 20));
store.dispatch(createPolicy( 'Sagar', 40));
store.dispatch(createPolicy( 'Jim', 30));
store.dispatch(createPolicy( 'Alexa', 50));

// Creating a claim
store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 40));

// Deleting a policy
store.dispatch(deletePolicy('Alexa'))

console.log(store.getState());