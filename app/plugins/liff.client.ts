import liff from '@line/liff'

export default defineNuxtPlugin(async (nuxtApp) => {
  // 🌟 將 config 的讀取移到這裡面
  const config = useRuntimeConfig()
  const liffid = config.public.liffId

  try {
    // 🌟 初始化
    await liff.init({ liffId: String(liffid) })
    console.log('LIFF 初始化成功！目前是否在 LINE 內：', liff.isInClient())
  } catch (err) {
    console.error('LIFF 初始化失敗', err)
  }

  return {
    provide: {
      liff
    }
  }
})