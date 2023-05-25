import { useEffect } from 'react'
import { useLocalStorageStore } from '../store';
import sendRequest from '../api/sendRequest';

function useFetchData() {

    const setManagersTabs = useLocalStorageStore(store => store.setManagersTabs);
    const setManagersPlaces = useLocalStorageStore(store => store.setManagersPlaces);
    const setPathologistsList = useLocalStorageStore(store => store.setPathologistsList);

    const fetchManagersTabs = async () => {
      let res = await sendRequest("managers/tabs");
      res.data.forEach(i => i.Id = i.cureTabId )
      setManagersTabs(res.data);
    };

    const fetchManagersPlace = async () => {
      let res = await sendRequest("managers/places");
      res.data.forEach(i => i.Id = i.visitPlaceId )
      setManagersPlaces(res.data);
    };

    const fetchPathologistsPlace = async () => {
      let res = await sendRequest("managers/pathologists");
      res.data.forEach(i => i.Id = i.pathologistId )
      setPathologistsList(res.data);
    };
    
    useEffect(() => {
      fetchManagersTabs();
      fetchManagersPlace()
      fetchPathologistsPlace()
    }, []);

  return {}
}

export default useFetchData