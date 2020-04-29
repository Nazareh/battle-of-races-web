import React, {useEffect, useState} from "react";
import axios from "axios";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import MilitaryPoint from "./MilitaryPoint/MilitaryPoint";
import RecruitUnits from "./RecruitUnits";
import Resources from "./Resources";
import {urls} from "./urls";

const Main = ({isAuthenticated, logout, general, updateGeneral}) => {
    const [armies, setArmies] = useState({});
    const [armyUnits, setArmyUnits] = useState(null);
    const [content, setContent] = useState(<Dashboard armyUnits={armyUnits}
                                                      general={general}/>);

    useEffect(() => {
        if (!!general) {
            updateGeneral(general.id);
            updateArmies(general.id);
        }
    }, []);

     const updateArmies = (generalId) => {
        axios.get(urls.getArmiesByGeneral + generalId)
            .then(res => {
                    setArmies(res.data);
                    updateArmyUnits(res.data)
                }
            );
    };
    const updateArmyUnits = (armies) => {
        axios.get(urls.getArmyUnitsbArmy + armies[0].id)
                .then(res => setArmyUnits(res.data)
                );
    };

    if (!general) {
        logout();
        return (<div></div>);
    } else {
        return (
            <div>
                <Navigation isAuthenticated={isAuthenticated}
                            logout={logout}/>
                <Resources general={general}/>
                <div className="dt dt--fixed">
                    <div className="dtc-ns tc w-20 pv4 bg-black-10">
                        <div className="pa3 pa5-ns">
                            <ul className="list pl0 measure center">
                                <li className="lh-copy pointer white grow pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
                                    onClick={() => {
                                        setContent(<Dashboard armyUnits={armyUnits}
                                                              general={general}
                                        />);
                                        updateArmyUnits(armies);
                                    }}
                                >Dashboard

                                </li>
                                <li className="lh-copy pointer white grow pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
                                    onClick={() => {
                                        setContent(<MilitaryPoint general={general}
                                                                  armies={armies}
                                        />);
                                        updateArmies(general.id);
                                    }}>Military Point
                                </li>
                                <li className="lh-copy pointer white grow pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
                                    onClick={() => {
                                        setContent(<RecruitUnits general={general}
                                                                 updateGeneral={updateGeneral}
                                                                 armies={armies}
                                                                 updateArmyUnits={updateArmyUnits}
                                        />);
                                        updateArmyUnits(armies);
                                    }}
                                > Recruit Units
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="dtc-ns tc w-80 pv4 bg-black-05">
                        {content}
                    </div>
                </div>
            </div>

        )
    }
}

export default Main;