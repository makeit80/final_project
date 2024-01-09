import { supabase } from "./supabase";
type editChartType = {
    rank: number;
    title: string;
    artist: string;
}

export const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('chart').select('*');
      return data;
    } catch (error) {
      console.log('Error', error);
    }
  };

export const editChart =async (data :editChartType) => {
    try {
        const {error} = await supabase
        .from('chart')
        .upsert(data)
    } catch (error) {
        console.log(error)
    }
}


