import { User } from '@/types/User';
import { getSupabaseClient } from '@/lib/supabase';


/**
 * ユーザープロフィールを取得
 * @param userId ユーザーID
 * @returns ユーザープロフィール
 */
export async function getUser(userId: string): Promise<User | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error) {
      console.error('ユーザープロフィール取得エラー:', error);
      throw error;
    }
    return data as User;
  } catch (error) {
    console.error('ユーザープロフィール取得エラー:', error);
    throw error;
  } 
}

/**
 * ユーザープロフィールを作成
 * @param user_data ユーザーデータ
 * @returns 作成されたユーザープロフィール
 */
export async function createUser(user_data: Partial<Omit<User, 'created_at' | 'brand_id' | 'profile_image'>>): Promise<User> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.from('users').insert(user_data).select('*').single();
    if (error) {
      console.error('ユーザープロフィール作成エラー:', error);
      throw error;
    }

    return data as User;
  } catch (error) {
    console.error('ユーザープロフィール作成エラー:', error);
    throw error;
  }
}

/**
 * ユーザーの編集
 * @param userId ユーザーID
 * @param userData ユーザーデータ
 * @returns 編集されたユーザープロフィール
 */
export async function updateUser(userId: string, userData: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User> {
  try { 
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('users').update(userData).eq('id', userId).select('*').single();
    if (error) {
      console.error('ユーザー編集エラー:', error);
      throw error;
    }
    return data as User;
  } catch (error) {
    console.error('ユーザー編集エラー:', error);
    throw error;
  }
}

/**
 * ログイン
 * @param email メールアドレス
 * @param password パスワード
 */
export const signIn = async (email: string, password: string) => {
  try {
    const supabase = getSupabaseClient();
    await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
  } catch (error) {
    console.error('ログインエラー:', error);
    throw error;
  }
};

/**
 * サインアップ
 * @param email メールアドレス
 * @param password パスワード
 */
export const signUp = async (email: string, password: string) => {
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (!data.user) {
      console.error('サインアップエラー:', data);
      throw new Error('ユーザーが作成できませんでした');
    }

    const user = await createUser({
      id: data.user.id,
      email: email,
    });

    return user;
  } catch (error) {
    console.error('サインアップエラー:', error);
    throw error;
  }
};

/**
 * ログアウト
 */
export const logout = async () => {
  try {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw error;
  }
};