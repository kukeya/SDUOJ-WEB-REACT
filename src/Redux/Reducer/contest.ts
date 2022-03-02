import {ConfigState} from "../../Type/IConfig";
import {ConfigAction} from "../Action/config";
import {ContestAction, ContestState} from "../Action/contest";

const initState: ContestState = {
    contestInfo: {}
}

export const ContestReducer = (state: ContestState = initState, action: ContestAction) => {
    let State = {...state}
    switch (action.type){
        case "setContestInfo":
            State.contestInfo[action.key] = action.data
            break
    }
    return State
}