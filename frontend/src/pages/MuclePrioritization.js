import React, { useState } from 'react';
import { ReactComponent as FrontMapSVG } from '../musclemap/frontmap.svg';
import { ReactComponent as BackMapSVG } from '../musclemap/backmap.svg';
import FrontImage from '../musclemap/front.png';
import BackImage from '../musclemap/back.png';
import '../musclemap/MuscleMap.css';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const MuscleSelectionPage = () => {
    // Initial muscle groups state
    const [muscleGroups, setMuscleGroups] = useState({
        Chest: { 
            selected: false, 
            priority: 2,
            muscles: {
                "Upper Chest": { selected: false, priority: 2 },
                "Middle Chest": { selected: false, priority: 2 },
                "Lower Chest": { selected: false, priority: 2 },
            }
        },
        Shoulders: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Front Delt": { selected: false, priority: 2 },
                "Side Delt": { selected: false, priority: 2 },
                "Rear Delt": { selected: false, priority: 2 },
            }
        },        
        Arms: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Biceps": { selected: false, priority: 2 },
                "Brachialis": { selected: false, priority: 2 },
                "Forearm Muscles": { selected: false, priority: 2 },
                "Triceps Long Head": { selected: false, priority: 2 },
                "Triceps Medial Head": { selected: false, priority: 2 },
                "Triceps Lateral Head": { selected: false, priority: 2 },
            }
        },
        Back: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Upper Traps": { selected: false, priority: 2 },
                "Middle Traps": { selected: false, priority: 2 },
                "Lower Traps": { selected: false, priority: 2 },
                "Latissimus Dorsi (Lats)": { selected: false, priority: 2 },
                "Teres Major": { selected: false, priority: 2 },
                "Infraspinatus": { selected: false, priority: 2 },
                "Erector Spinae (Erectors)": { selected: false, priority: 2 },
            }
        },
        Core: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Upper Rectus Abdominis": { selected: false, priority: 2 },
                "Lower Rectus Abdominis": { selected: false, priority: 2 },
                "Obliques": { selected: false, priority: 2 },
            }
        },

        Neck: { selected: false, priority: 2, muscles:{ "Neck Muscles":{ selected: false, priority: 2 }} },

        Quads: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Vastus Medialis": { selected: false, priority: 2 },
                "Vastus Lateralis": { selected: false, priority: 2 },
                "Rectus Femoris": { selected: false, priority: 2 },
            }
        },
        "Hamstrings and adductors": { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Hamstrings": { selected: false, priority: 2 },
                "Adductors": { selected: false, priority: 2 },
            }
        },
        Glutes: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Gluteus Maximus": { selected: false, priority: 2 },
                "Gluteus Medius": { selected: false, priority: 2 },
            }
        },
        Calves: { 
            selected: false, 
            priority: 2, 
            muscles: {
                "Gastrocnemius": { selected: false, priority: 2 },
                "Soleus": { selected: false, priority: 2 },
            }
        },
    });  

    const muscleToSvgIdMap = {
        "Upper Chest": ["leftUpperChest", "rightUpperChest"],
        "Middle Chest": ["leftMiddleChest", "rightMiddleChest"],
        "Lower Chest": ["leftLowerChest", "rightLowerChest"],
        "Front Delt": ["leftFrontDelt", "rightFrontDelt"],
        "Side Delt": ["frontleftSideDelt", "frontrightSideDelt","backleftSideDelt","backrightSideDelt"],
        "Rear Delt": ["leftRearDeltoid", "rightRearDeltoid"],
        "Biceps": ["leftBicep", "rightBicep"],
        "Brachialis": ["leftBrachialis", "rightBrachialis"],
        "Forearm Muscles": ["leftForearmMuscles", "rightForearmMuscles"],
        "Triceps Long Head": ["leftLongHead", "rightLongHead"],
        "Triceps Medial Head": ["leftMedialHead", "rightMedialHead"],
        "Triceps Lateral Head": ["leftLateralHead", "rightLateralHead"],
        "Upper Traps": ["frontleftUpperTraps", "frontrightUpperTraps","backUpperTraps"],
        "Middle Traps": ["MiddleTraps"],
        "Lower Traps": ["LowerTraps"],
        "Latissimus Dorsi (Lats)": ["leftLat", "rightLat"],
        "Teres Major": ["leftTeresMajor", "rightTeresMajor"],
        "Infraspinatus": ["leftInfraspinatus", "rightInfraspinatus"],
        "Erector Spinae (Erectors)": ["Erectors"],
        "Upper Rectus Abdominis": ["upperRectusAbdominis"],
        "Lower Rectus Abdominis": ["lowerRectusAbdominis"],
        "Obliques": ["leftOblique","rightOblique"],
        "Neck Muscles": ["frontNeckMuscles"],
        "Vastus Medialis": ["leftVastusMedialis", "rightVastusMedialis"],
        "Vastus Lateralis": ["leftVastusLateralis", "rightVastusLateralis"],
        "Rectus Femoris": ["leftRectusFemoris", "rightRectusFemoris"],
        "Hamstrings": ["rightHamstrings","leftHamstrings"],
        "Adductors": ["leftAdductors", "rightAdductors"],
        "Gluteus Maximus": ["leftGluteusMaximus", "rightGluteusMaximus"],
        "Gluteus Medius": ["leftGluteusMedius", "rightGluteusMedius"],
        "Gastrocnemius": ["leftGastrocnemius", "rightGastrocnemius"],
        "Soleus": ["leftSoleus", "rightSoleus"],

    };
    
    const updateSvgStyleById = (ids, priority) => {
        ids.forEach(id => {
          const element = document.getElementById(id);
          if (!element) return;
      
          let color, stroke, strokeWidth;
          switch (priority) {
            case 1: 
                color = 'rgba(0, 0, 255, 0.5)'; // Blue with 50% opacity
                stroke = 'none';
                strokeWidth = '0';
                break;
            case 3: 
                color = 'rgba(240, 128, 128, 0.5)'; // Lightcoral with 50% opacity
                stroke = 'none';
                strokeWidth = '0';
                break;
            case 4: 
                color = 'rgba(255, 0, 0, 0.5)'; // Red with 50% opacity
                stroke = 'none';
                strokeWidth = '0';
                break;
            case 5: 
                color = 'rgba(255, 0, 0, 0.75)'; // Darkred with 75% opacity
                stroke = 'rgba(255, 0, 0, 0.8)'; // Apply a red stroke for glow
                strokeWidth = '2'; // Increase stroke width for visible glow
                break;
            default: 
                color = 'none'; // No fill for priority 2 or unspecified
                stroke = 'none';
                strokeWidth = '0';
        }
      
        element.style.fill = color;
        element.style.stroke = stroke;
        element.style.strokeWidth = strokeWidth;
        });
    };
    
      
    const handleMuscleGroupSelection = (groupName, muscleName, newPriority, isGroupSlider = false) => {
        setMuscleGroups(prevGroups => {
          let updatedGroups = { ...prevGroups };
      
          // If the change comes from a group slider, update the entire group's priority
          if (isGroupSlider) {
            let updatedMuscles = {};
            Object.keys(updatedGroups[groupName].muscles).forEach(muscleKey => {
              updatedMuscles[muscleKey] = { ...updatedGroups[groupName].muscles[muscleKey], priority: newPriority };
            });
      
            updatedGroups = {
              ...updatedGroups,
              [groupName]: {
                ...updatedGroups[groupName],
                priority: newPriority,
                muscles: updatedMuscles,
              },
            };
      
            // Update SVG for the entire group
            Object.keys(updatedMuscles).forEach(muscle => {
              const ids = muscleToSvgIdMap[muscle];
              if (ids) {
                updateSvgStyleById(ids, newPriority);
              }
            });
          } else if (muscleName) {
            // Update for an individual muscle
            const muscleUpdate = {
              ...updatedGroups[groupName].muscles[muscleName],
              priority: newPriority,
            };
      
            updatedGroups[groupName].muscles[muscleName] = muscleUpdate;
      
            // Update SVG for the individual muscle
            const ids = muscleToSvgIdMap[muscleName];
            if (ids) {
              updateSvgStyleById(ids, newPriority);
            }
          }
      
          return updatedGroups;
        });
      };
      
      
  

      return (
        <div> 
            <Navbar/>
        <div className="container">
          
        <div className="training-focus-header">
                <h2>Training Focus Guide</h2>
                <div className="color-description">
                    <div className="color-item"><span className="color-box blue"></span>Detraining / Smaller</div>
                    <div className="color-item"><span className="color-box none"></span>Maintenance</div>
                    <div className="color-item"><span className="color-box lightcoral"></span>Minimum Growth</div>
                    <div className="color-item"><span className="color-box red"></span>Growth Focus</div>
                    <div className="color-item"><span className="color-box darkred"></span>Ultra Focus / Lagging</div>
                </div>
            </div>
            <div className="layout">
                
            <div className="muscle-map-container">
                <div className="image-overlay-container">
                    <img src={FrontImage} alt="Front Muscle Map" className="muscle-map-image" />
                    <FrontMapSVG className="muscle-map-overlay front-map-overlay" />
                </div>
                <div className="image-overlay-container">
                    <img src={BackImage} alt="Back Muscle Map" className="muscle-map-image" />
                    <BackMapSVG className="muscle-map-overlay back-map-overlay" />
                </div>
            </div>
            <div className="muscle-selection-scroll">
           

            <div className="muscle-group-selection">
                {Object.keys(muscleGroups).map((groupName) => (
                    <div key={groupName} className="muscle-group-card">
                        <h3>{groupName}</h3>
                        <div className="group-slider">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={muscleGroups[groupName].priority}
                            onChange={(e) => handleMuscleGroupSelection(groupName, null, parseInt(e.target.value), true)}
                            className="priority-slider"
                        />
                        </div>

                        {Array.isArray(muscleGroups[groupName].muscles) ? (
                            <div>
                                <button onClick={() => handleMuscleGroupSelection(groupName, null, 3)}>
                                    Set Priority for {groupName}
                                </button>
                                <input type="range" min="1" max="5" defaultValue={muscleGroups[groupName].priority}
                                    onChange={(e) => handleMuscleGroupSelection(groupName, null, parseInt(e.target.value))}
                                    className="priority-slider" />
                            </div>
                        ) : (
                            <div className="muscle-details">
                                {Object.keys(muscleGroups[groupName].muscles).map((muscleName) => (
                                    <div key={muscleName} className="muscle-item">
                                        <span>{muscleName}</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="5"
                                            value={muscleGroups[groupName].muscles[muscleName].priority}
                                            onChange={(e) => handleMuscleGroupSelection(groupName, muscleName, parseInt(e.target.value))}
                                            className="priority-slider"
                                            />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
             </div>
            </div>
        </div>
     
        </div>
        <Footer/>
        </div>
    );
  
};

export default MuscleSelectionPage;