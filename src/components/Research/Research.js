import React from "react";

import { Tree } from "react-tech-tree";
import "react-tech-tree/dist/index.css";

const Research = ({logout,doResearch, tree }) => {
    const { nodes, links } = tree;

    const MyNodeElement = ({ name, id, disabled }) => (
        <button id={id}
                className="Node"
                disabled={disabled}
                onClick={() => {doResearch(id);
        }}>
            {name}
        </button>
    );

    if(tree.length === 0 ){
        logout();
        return (
            <div></div>
        )
    }
    return (
            <div className="measure center mv5 flex flex-column pa4 bg-black-70 ">
                <p className="f3 tc">Research</p>
                <Tree id="effects-tree"
                      nodes={nodes}
                      links={links}
                      NodeElement={MyNodeElement}/>
            </div>
        );
}


export default Research;
