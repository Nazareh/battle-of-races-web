import React from "react";

import { Tree } from "react-tech-tree";
import "react-tech-tree/dist/index.css";
import tree from "./tree.json";

const Research = ({nodeClickHandler}) => {
    const { nodes, links } = tree;

    const MyNodeElement = ({ name, id, disabled }) => (

        <button id={id}
                className="Node"
                disabled={disabled}
                onClick={nodeClickHandler}>
            {name}
        </button>
    );

    return (

            <Tree id="effects-tree"
                  nodes={nodes}
                  links={links}
                  NodeElement={MyNodeElement}/>
        );
}


export default Research;
