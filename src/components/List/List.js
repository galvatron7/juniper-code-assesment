import React,{useContext} from "react";

const List = ({ items, setSelectedItem, selected }) => {

    React.useEffect(()=> {
    },[items]);

    return(
        <nav className="list">
            <ul>
                {
                    items.map((item, idx) =>
                        <li key={idx} className={selected == item.id ? "selected" : ""}>
                            <a href="#" onClick={() => setSelectedItem(item.id)}>{item.name}</a>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
};

export default List;