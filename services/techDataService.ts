
import { supabase } from './supabaseClient';
import { TechItem } from '../types';

/**
 * 从 Supabase 获取所有技术项
 */
export async function getTechItems(): Promise<TechItem[]> {
    const { data, error } = await supabase
        .from('tech_items')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('获取技术项失败:', error);
        return [];
    }

    return (data || []) as TechItem[];
}

/**
 * 将新的技术项保存到 Supabase
 */
export async function saveTechItem(item: TechItem): Promise<boolean> {
    const { error } = await supabase
        .from('tech_items')
        .upsert(item);

    if (error) {
        console.error('保存技术项失败:', error);
        return false;
    }

    return true;
}
