import {
  BookOpen,
  Box,
  Boxes,
  Cpu,
  Film,
  Image,
  MessageCircleQuestionMark,
  PersonStanding,
  Plane,
  ScanLine,
  SlidersHorizontal,
  Sparkles,
  StepForward,
  Video,
  WandSparkles,
  Waypoints,
} from "@lucide/vue"
import type { Component } from "vue"

import type { PublicationTopic } from "../../lib/content/types.ts"

export const publicationTopicIcons = {
  "learned-image-compression": Image,
  "learned-video-compression": Video,
  "3d-gaussian-compression": Box,
  "4d-gaussian-compression": Boxes,
  "point-cloud-compression": Waypoints,
  "human-pose-estimation": PersonStanding,
  "image-restoration": WandSparkles,
  "video-synthesis": Film,
  "semantic-segmentation": ScanLine,
  "coding-for-machines": Cpu,
  "video-encoder-control": SlidersHorizontal,
  "video-prediction": StepForward,
  "incremental-learning": BookOpen,
  "visual-question-answering": MessageCircleQuestionMark,
  "generative-modeling": Sparkles,
  "autonomous-flight": Plane,
} as const satisfies Readonly<Record<PublicationTopic, Component>>
