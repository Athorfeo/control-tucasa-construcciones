import { useState } from 'react';

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivityForExecutedQuantity, setSelectedActivityForExecutedQuantity] = useState(-1);

  const onRemoveActivity = (index) => {
    const temp = [...activities];
    temp.splice(index, 1);
    setActivities(temp);
  }

  const onAddActivity = (activity) => {
    const temp = [...activities];
    temp.push(activity);
    setActivities(temp);
  };

  const onSetExecutedQuantity = (value) => {
    const temp = [...activities];
    temp[selectedActivityForExecutedQuantity].executedQuantity = value;
    setActivities(temp);
    setSelectedActivityForExecutedQuantity(-1);
  }

  const onSelectActivityForExecutedQuantity = (index) => {
    setSelectedActivityForExecutedQuantity(index);
  }

  const onLoadActivities = (rawActivities) => {
    const temp = rawActivities.map((item) => {
      return {
        activity: item[5],
        unit: item[6],
        chapterName: item[7],
        executedQuantity: item[11]
      }
    });
    setActivities(temp);
  }

  return {
    activities,
    onRemoveActivity,
    onAddActivity,
    onSetExecutedQuantity,
    onSelectActivityForExecutedQuantity,
    onLoadActivities
  };
}