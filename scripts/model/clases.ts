
export class Machine{
    constructor(private Name: string, private IPNumber: string, private Disk: string){
    }
}


export class File{
    public Owner: User;
    constructor(private Name: string, private Date: Date){
    }
}

export class User{
    constructor(private Name: string, private Login: string, private passwd: string){
    }
}


export class Group{
    constructor(private Name: string){
    }
}