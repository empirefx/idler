import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentPlace, selectAvailableConnections } from '../../../store/slices/placesSlice';
import { selectIsInCombat, startCombat, stopCombat } from '../../../store/slices/combatSlice';
import ControlDisplay from '../display/ControlDisplay';

const ControlSection = () => {
  const currentPlace = useSelector(selectCurrentPlace);
  const isInCombat = useSelector(selectIsInCombat);
  const dispatch = useDispatch();

  if (!currentPlace.spawn) return null;

  return (
    <section className="control-section">
      <ControlDisplay
        isInCombat={isInCombat}
        onToggleCombat={() => dispatch(isInCombat ? stopCombat() : startCombat())}
      />
    </section>
  );
};

export default ControlSection;
