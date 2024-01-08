import { supabase } from "./supabase";
type editChartType = {
    rank: number;
    title: string;
    artist: string;
}

export const editChart =async (data :editChartType) => {
    try {
        const {error} = await supabase
        .from('chart')
        .upsert(data)
    } catch (error) {
        console.log(error)
    }
}
