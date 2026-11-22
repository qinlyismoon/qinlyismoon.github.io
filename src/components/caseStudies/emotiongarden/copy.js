// Shared bilingual names for the Emotion Garden case-study widgets.
import { useAppSettings } from "../../../context/AppSettingsContext";

export function useLang() {
  const { language } = useAppSettings();
  return language === "zh" ? "zh" : "en";
}

export const NAMES = {
  en: {
    feeling: {
      joy: "joy",
      trust: "trust",
      fear: "fear",
      surprise: "surprise",
      sadness: "sadness",
      disgust: "disgust",
      anger: "anger",
      anticipation: "anticipation",
    },
    scene: {
      work: "work · study",
      social: "relationships",
      daily: "daily life",
      body: "body · health",
      own: "own time",
      world: "the wider world",
    },
    action: {
      breathing: "breathing",
      meditation: "meditation",
      music: "music",
      movement: "movement",
      rest: "rest",
      reframing: "reframing",
      problem: "problem-solving",
      reaching: "reaching out",
      nothing: "nothing",
    },
    outcome: { helped: "it helped", same: "no change", harder: "made it harder" },
  },
  zh: {
    feeling: {
      joy: "喜悦",
      trust: "信任",
      fear: "恐惧",
      surprise: "惊讶",
      sadness: "悲伤",
      disgust: "厌恶",
      anger: "愤怒",
      anticipation: "期待",
    },
    scene: {
      work: "工作 · 学习",
      social: "人际关系",
      daily: "日常生活",
      body: "身体 · 健康",
      own: "自己的时间",
      world: "更大的世界",
    },
    action: {
      breathing: "呼吸",
      meditation: "冥想",
      music: "音乐",
      movement: "运动",
      rest: "休息",
      reframing: "换个角度想",
      problem: "解决问题",
      reaching: "找人聊聊",
      nothing: "什么都没做",
    },
    outcome: { helped: "有帮助", same: "没变化", harder: "更难了" },
  },
};
