import { useState } from 'react';
import { staticData } from "data/static-data";

export const useAddActivity = ({onAddCallback}) => {
  const [positionSelectedUnit, setPositionSelectedUnit] = useState(0);
  const [positionSelectedChapter, setPositionSelectedChapter] = useState(0);
  const [positionSelectedActivityChapter, setPositionSelectedActivitiyChapter] = useState(0);
  const [activitiesChapter, setActivitiesChapter] = useState(staticData.chapters[0].activities);

  function onUpdateChapter(value) {
    const activitiesChapterSelected = staticData.chapters[value].activities;
    setPositionSelectedChapter(value);
    setActivitiesChapter(activitiesChapterSelected);
  }

  function onUpdateActivityChapter(value) {
    setPositionSelectedActivitiyChapter(value);
  }

  const isSubmitDisabled = () => {
    if (
      positionSelectedChapter !== '' &&
      positionSelectedActivityChapter !== '' &&
      positionSelectedUnit !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const selectedChapter = staticData.chapters[positionSelectedChapter];
    const selectedActivity = activitiesChapter[positionSelectedActivityChapter];
    const selectedUnit = staticData.units[positionSelectedUnit];
    
    const data = {
      activity: selectedActivity,
      unit: selectedUnit.name,
      chapterName: selectedChapter.name,
      executedQuantity: '0'
    }

    onAddCallback(data);

    
    setPositionSelectedChapter(0);
    setPositionSelectedActivitiyChapter(0);
    setPositionSelectedUnit(0);
  };

  return {
    positionSelectedUnit,
    setPositionSelectedUnit,
    positionSelectedChapter,
    onUpdateChapter,
    positionSelectedActivityChapter,
    onUpdateActivityChapter,
    activitiesChapter,
    isSubmitDisabled,
    handleSubmitForm
  };
}