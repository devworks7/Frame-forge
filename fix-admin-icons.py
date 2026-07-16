import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'import { X, LayoutDashboard, Briefcase, FileText, Settings, Users, ArrowRight, Play, Eye, Mail, Lock, Plus, Trash2, Edit2, CheckCircle2, XCircle, Clock, Save, Image as ImageIcon, Video, Star, PenTool, LayoutTemplate, Layers, AlertCircle } from "lucide-react";',
    'import { X, LayoutDashboard, Briefcase, FileText, Settings, Users, ArrowRight, Play, Eye, Mail, Lock, Plus, Trash2, Edit2, CheckCircle2, XCircle, Clock, Save, Image as ImageIcon, Video, Star, PenTool, LayoutTemplate, Layers, AlertCircle, Database } from "lucide-react";'
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
