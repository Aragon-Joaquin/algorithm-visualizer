export * from './mazeInfoStore'
export * from './mazePropsStore'
export * from './mazeUIStore'

/*
to be honest i didn't want to bloat my web more but since it takes a
1) hashmap with functions that accepts state & payload 
2) func that validates if the action is in the hashmap 
3) useReducer in a custom hook 
4) dispatch methods there 
5) and import them into another context just to do one (1) reducer, its gets tiring

zustand isn't a reducer perse, its a store but it does what i've needed. reduce logic.
*/
