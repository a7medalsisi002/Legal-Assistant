import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Download, Trash2, Plus, Edit, X, FileText, File, Languages } from "lucide-react";

type DocType = "Contract" | "Analysis" | "Translation";

interface VaultDoc { id: number; name: string; arName: string; type: DocType; date: string; size: string; }
interface VaultCase { id: number; title: string; arTitle: string; date: string; status: "Open" | "In Progress" | "Resolved"; }

const initDocs: VaultDoc[] = [
  { id: 1, name: "Employment_Contract_Final.pdf", arName: "عقد_العمل_النهائي.pdf", type: "Contract", date: "2025-05-28", size: "1.2 MB" },
  { id: 2, name: "Lease_Agreement_Giza.pdf", arName: "عقد_إيجار_الجيزة.pdf", type: "Contract", date: "2025-05-20", size: "856 KB" },
  { id: 3, name: "NDA_Analysis_Report.pdf", arName: "تقرير_تحليل_اتفاقية_السرية.pdf", type: "Analysis", date: "2025-05-15", size: "2.1 MB" },
  { id: 4, name: "Translated_Labor_Law.pdf", arName: "قانون_العمل_المترجم.pdf", type: "Translation", date: "2025-05-10", size: "3.4 MB" },
  { id: 5, name: "Property_Sale_Contract.pdf", arName: "عقد_بيع_العقار.pdf", type: "Contract", date: "2025-04-30", size: "945 KB" },
  { id: 6, name: "Risk_Analysis_NDA.pdf", arName: "تحليل_مخاطر_اتفاقية_السرية.pdf", type: "Analysis", date: "2025-04-22", size: "1.8 MB" },
  { id: 7, name: "Translated_Investment_Law.pdf", arName: "قانون_الاستثمار_المترجم.pdf", type: "Translation", date: "2025-04-15", size: "4.2 MB" },
  { id: 8, name: "Freelance_Service_Contract.pdf", arName: "عقد_خدمات_مستقل.pdf", type: "Contract", date: "2025-04-10", size: "678 KB" },
];

const initCases: VaultCase[] = [
  { id: 1, title: "Employment Dispute – Al-Nile Corp", arTitle: "نزاع عمالي – شركة النيل", date: "2025-05-28", status: "Open" },
  { id: 2, title: "Residential Lease Review", arTitle: "مراجعة عقد الإيجار السكني", date: "2025-05-20", status: "Resolved" },
  { id: 3, title: "NDA for Software Partnership", arTitle: "اتفاقية سرية لشراكة برمجية", date: "2025-05-15", status: "In Progress" },
  { id: 4, title: "Property Sale Dispute – Cairo", arTitle: "نزاع بيع عقارات – القاهرة", date: "2025-05-10", status: "Resolved" },
];

const typeIcons: Record<DocType, typeof FileText> = { Contract: FileText, Analysis: File, Translation: Languages };
const typeBadge: Record<DocType, string> = { Contract: "bg-blue-100 text-blue-800", Analysis: "bg-red-100 text-red-800", Translation: "bg-green-100 text-green-800" };
const statusBadge: Record<string, string> = { Open: "bg-green-100 text-green-800", "In Progress": "bg-yellow-100 text-yellow-800", Resolved: "bg-gray-100 text-gray-700" };

export default function Vault() {
  const { language } = useAppContext();
  const [tab, setTab] = useState<"all" | DocType>("all");
  const [docs, setDocs] = useState<VaultDoc[]>(initDocs);
  const [cases, setCases] = useState<VaultCase[]>(initCases);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCase, setNewCase] = useState({ title: "", desc: "", laws: "", status: "Open" });

  const tx = {
    en: {
      title: "My Legal Vault",
      security: "All documents are encrypted and stored securely. Only you can access them.",
      tabs: { all: "All", Contract: "Contracts", Analysis: "Analyses", Translation: "Translations" },
      download: "Download", delete: "Delete",
      stats: [{ label: "Total Documents", key: "docs" }, { label: "Active Cases", key: "active" }, { label: "Contracts Generated", key: "contracts" }],
      cases_title: "Cases Dashboard",
      add_case: "Add New Case",
      case_col: { title: "Case Title", date: "Date Added", status: "Status", actions: "Actions" },
      status_labels: { Open: "Open", "In Progress": "In Progress", Resolved: "Resolved" },
      type_labels: { Contract: "Contract", Analysis: "Analysis", Translation: "Translation" },
      modal_title: "Add New Case",
      case_title_label: "Case Title", desc_label: "Description", laws_label: "Related Laws (tags)", status_label: "Status",
      cancel: "Cancel", save: "Save Case",
      open: "Open", in_progress: "In Progress", resolved: "Resolved",
    },
    ar: {
      title: "خزنتي القانونية",
      security: "جميع المستندات مشفرة ومخزنة بشكل آمن. أنت فقط من يمكنك الوصول إليها.",
      tabs: { all: "الكل", Contract: "العقود", Analysis: "التحليلات", Translation: "الترجمات" },
      download: "تحميل", delete: "حذف",
      stats: [{ label: "إجمالي المستندات", key: "docs" }, { label: "القضايا النشطة", key: "active" }, { label: "العقود المُنشأة", key: "contracts" }],
      cases_title: "لوحة القضايا",
      add_case: "إضافة قضية جديدة",
      case_col: { title: "عنوان القضية", date: "تاريخ الإضافة", status: "الحالة", actions: "الإجراءات" },
      status_labels: { Open: "مفتوحة", "In Progress": "قيد التنفيذ", Resolved: "محلولة" },
      type_labels: { Contract: "عقد", Analysis: "تحليل", Translation: "ترجمة" },
      modal_title: "إضافة قضية جديدة",
      case_title_label: "عنوان القضية", desc_label: "الوصف", laws_label: "القوانين ذات الصلة (وسوم)", status_label: "الحالة",
      cancel: "إلغاء", save: "حفظ القضية",
      open: "مفتوحة", in_progress: "قيد التنفيذ", resolved: "محلولة",
    }
  }[language];

  const filtered = tab === "all" ? docs : docs.filter(d => d.type === tab);
  const statValues = {
    docs: docs.length,
    active: cases.filter(c => c.status !== "Resolved").length,
    contracts: docs.filter(d => d.type === "Contract").length,
  };

  const addCase = () => {
    const nc: VaultCase = {
      id: Date.now(), title: newCase.title || "New Case", arTitle: newCase.title || "قضية جديدة",
      date: new Date().toISOString().slice(0, 10), status: newCase.status as VaultCase['status'],
    };
    setCases(prev => [nc, ...prev]);
    setNewCase({ title: "", desc: "", laws: "", status: "Open" });
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{tx.title} 🔒</h1>
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 flex items-start gap-2">
              <Shield className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <p className="text-sm text-green-800">{tx.security}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {tx.stats.map(s => (
              <div key={s.key} className="bg-card border border-border rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-secondary">{statValues[s.key as keyof typeof statValues]}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(["all", "Contract", "Analysis", "Translation"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                    data-testid={`tab-${t}`}>
                    {tx.tabs[t as keyof typeof tx.tabs] ?? t}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border">
              {filtered.map(doc => {
                const Icon = typeIcons[doc.type];
                return (
                  <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors" data-testid={`vault-doc-${doc.id}`}>
                    <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-muted-foreground" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{language === 'en' ? doc.name : doc.arName}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge[doc.type]}`}>{tx.type_labels[doc.type as keyof typeof tx.type_labels]}</span>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" className="gap-1 text-xs h-7" data-testid={`button-dl-${doc.id}`}><Download className="h-3 w-3" />{tx.download}</Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 h-7 w-7 p-0" onClick={() => setDocs(d => d.filter(x => x.id !== doc.id))} data-testid={`button-del-${doc.id}`}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cases */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold text-foreground">{tx.cases_title}</h2>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1 text-xs" onClick={() => setModalOpen(true)} data-testid="button-add-case">
                <Plus className="h-3.5 w-3.5" />{tx.add_case}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-muted/50">
                  {[tx.case_col.title, tx.case_col.date, tx.case_col.status, tx.case_col.actions].map(h => (
                    <th key={h} className="text-start p-4 font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {cases.map(c => (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/30" data-testid={`case-row-${c.id}`}>
                      <td className="p-4 font-medium text-foreground">{language === 'en' ? c.title : c.arTitle}</td>
                      <td className="p-4 text-muted-foreground">{c.date}</td>
                      <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[c.status]}`}>{tx.status_labels[c.status as keyof typeof tx.status_labels]}</span></td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" data-testid={`button-edit-case-${c.id}`}><Edit className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" onClick={() => setCases(p => p.filter(x => x.id !== c.id))} data-testid={`button-del-case-${c.id}`}><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      <Footer />

      {/* Add Case Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="add-case-modal">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold text-foreground">{tx.modal_title}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground" data-testid="button-close-case-modal"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div><Label className="mb-1 block">{tx.case_title_label}</Label><Input value={newCase.title} onChange={e => setNewCase(p => ({ ...p, title: e.target.value }))} data-testid="input-case-title" /></div>
              <div><Label className="mb-1 block">{tx.desc_label}</Label>
                <textarea value={newCase.desc} onChange={e => setNewCase(p => ({ ...p, desc: e.target.value }))} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring" data-testid="input-case-desc" /></div>
              <div><Label className="mb-1 block">{tx.laws_label}</Label><Input value={newCase.laws} onChange={e => setNewCase(p => ({ ...p, laws: e.target.value }))} placeholder="Labor Law, Civil Code..." data-testid="input-case-laws" /></div>
              <div><Label className="mb-2 block">{tx.status_label}</Label>
                <div className="flex gap-2">
                  {["Open", "In Progress", "Resolved"].map(s => (
                    <button key={s} onClick={() => setNewCase(p => ({ ...p, status: s }))}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${newCase.status === s ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'}`}
                      data-testid={`button-status-${s.replace(' ','-').toLowerCase()}`}>
                      {s === "Open" ? tx.open : s === "In Progress" ? tx.in_progress : tx.resolved}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 pt-0">
              <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)} data-testid="button-cancel-case">{tx.cancel}</Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={addCase} data-testid="button-save-case">{tx.save}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
