import { useState } from 'react';
import { staticData } from "data/static-data";

export const useAddActivity = ({onAddCallback}) => {
  const [activityName, setActivityName] = useState('');
  const [positionSelectedUnit, setPositionSelectedUnit] = useState(0);
  const [positionSelectedChapter, setPositionSelectedChapter] = useState(0);

  const isSubmitDisabled = () => {
    if (
      activityName !== '' && 
      positionSelectedUnit !== '' &&
      positionSelectedChapter !== '') {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const selectedUnit = staticData.units[positionSelectedUnit];
    const selectedChapter = staticData.chapters[positionSelectedChapter];
    
    const data = {
      activity: activityName,
      unit: selectedUnit.name,
      chapterName: selectedChapter.name,
      executedQuantity: '0'
    }

    onAddCallback(data);

    setActivityName('');
    setPositionSelectedUnit(0);
    setPositionSelectedChapter(0);
  };


  return {
    activityName,
    setActivityName,
    positionSelectedUnit,
    setPositionSelectedUnit,
    positionSelectedChapter,
    setPositionSelectedChapter,
    isSubmitDisabled,
    handleSubmitForm,
  };
}