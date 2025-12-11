import { AssociateModel } from "../Model/Associates.model";

export const AssociateState:AssociateModel={
    list:[],
    errormessage:'',
    associateobj:{
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        associategroup: "level1",
        status: true
    }
}