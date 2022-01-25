export function Homepage(props : any) {
    return (
        <div>
            <h1>Welcome to the {props.name} !</h1>
            {props.children}
        </div>
    );  
}

export function SearchBar(){
    return (
        <div>
            <h1>This is the SearchBar!</h1>
        </div>
    )
}

export function Chat(){
    return (
        <div>
            <h1>This is the Chat!</h1>
        </div>
    )
}

export function DaoTable(props: any){
    return (
        <div>
            <DaoHeader/>
            <DaoList/>
        </div>
    )
}

function DaoHeader(){
    return (
        <div>
            <h1>This is the Dao Header!</h1>
        </div>
    )
}

function DaoList(){
    return (
        <div>
            <h1>This is the DaoList!</h1>
        </div>
    )
}
