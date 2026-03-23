export type Project = {
  id: string;
  title: string;
  category: "Computer Vision" | "NLP" | "Audio AI" | "Edge AI";
  tags: string[];
  thumbnail: string;
  overview: string;
  technical: string;
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "brain-tumor-mri",
    title: "Brain Tumor MRI Classification",
    category: "Computer Vision",
    tags: ["PyTorch", "EfficientNet-B0", "Medical AI", "CLAHE"],
    thumbnail: "/projects/brain-mri.jpg",
    overview:
      "An AI tool that helps doctors identify brain tumors from MRI scans more accurately and faster — reducing diagnosis time and supporting clinical decision-making.",
    technical:
      "Fine-tuned EfficientNet-B0 with custom preprocessing pipeline using CLAHE to enhance medical image contrast. Handled class imbalance with Weighted Cross-Entropy loss. Trained on 4-class brain tumor dataset (glioma, meningioma, pituitary, no tumor).",
    metrics: [
      { label: "Accuracy", value: "98.2%" },
      { label: "Inference Time", value: "45ms" },
      { label: "Tumor Classes", value: "4" },
    ],
    githubUrl:
      "https://github.com/anindyaprayoga/brain-tumor-mri-classification",
    demoUrl:
      "https://brain-tumor-mri-classification-xngibf4a24pshv25gjvppm.streamlit.app/",
  },
  {
    id: "waste-sorter",
    title: "Waste Sorter AI",
    category: "Edge AI",
    tags: ["YOLOv8", "Real-time", "Edge AI", "Robotics"],
    thumbnail: "/projects/waste-sorter.jpg",
    overview:
      "Real-time recycling assistant that automatically classifies plastic, paper, and organic waste — deployable on edge devices without cloud dependency.",
    technical:
      "Implemented YOLOv8 for object detection with a custom-labeled dataset of 3 waste categories. Optimized for Edge AI deployment using ONNX export. Achieves 30 FPS on Raspberry Pi 4 with TensorRT acceleration.",
    metrics: [
      { label: "Inference Speed", value: "30 FPS" },
      { label: "Waste Classes", value: "3" },
      { label: "Deployment", value: "Edge" },
    ],
    githubUrl: "https://github.com/anindyaprayoga/waste-sorter-ai",
    demoUrl: "https://waste-sorter-app.vercel.app/",
  },
  {
    id: "pump-anomaly",
    title: "Industrial Pump Anomaly Detection",
    category: "Audio AI",
    tags: ["Signal Processing", "LSTM", "Mel-Spectrogram", "Industry 4.0"],
    thumbnail: "/projects/pump-anomaly.jpg",
    overview:
      "A system that listens to industrial pumps and alerts engineers before a breakdown happens — enabling predictive, not reactive, maintenance.",
    technical:
      "Converted raw audio signals to Mel-Spectrograms for feature extraction. Built an LSTM-Autoencoder that learns normal pump behavior and flags deviations as anomalies. Trained on MIMII Dataset with augmentation for noise robustness.",
    metrics: [
      { label: "F1-Score", value: "0.92" },
      { label: "Architecture", value: "LSTM-AE" },
      { label: "Dataset", value: "MIMII" },
    ],
    githubUrl:
      "https://github.com/anindyaprayoga/industrial-sound-anomaly-detection",
    demoUrl:
      "https://industrial-sound-anomaly-detection-zwpisayqwugnfh25ijjmyh.streamlit.app/",
  },
];
