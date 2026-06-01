import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, RefreshCw, Users, MessageSquare, FileText, Clock } from "lucide-react";

const initPendingLawyers = [
  { id: 1, name: "Mohamed Khalid", syndicateId: "EBA-2024-78452", specialty: "Criminal Law", submitted: "2025-05-25" },
  { id: 2, name: "Sara Ibrahim", syndicateId: "EBA-2024-91203", specialty: "Family Law", submitted: "2025-05-23" },
  { id: 3, name: "Omar Farouk", syndicateId: "EBA-2023-55671", specialty: "Labor Law", submitted: "2025-05-20" },
  { id: 4, name: "Nada El-Shafei", syndicateId: "EBA-2024-34892", specialty: "Civil Law", submitted: "2025-05-18" },
];

const initUsers = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", role: "Regular User", residency: "Egyptian Citizen", joined: "2025-01-15", banned: false },
  { id: 2, name: "Layla Mohamed", email: "layla@example.com", role: "Legal Professional", residency: "Egyptian Citizen", joined: "2025-02-03", banned: false },
  { id: 3, name: "John Smith", email: "john@example.com", role: "Regular User", residency: "Foreign Resident", joined: "2025-03-11", banned: false },
  { id: 4, name: "Fatima Al-Zahraa", email: "fatima@example.com", role: "Legal Professional", residency: "Egyptian Citizen", joined: "2025-04-05", banned: false },
  { id: 5, name: "Karim Mansour", email: "karim@example.com", role: "Regular User", residency: "Egyptian Citizen", joined: "2025-04-22", banned: true },
];

const datasets = [
  { name: "Egyptian Civil Code (Law 131/1948)", updated: "2025-04-01" },
  { name: "Labor Law No. 12 of 2003", updated: "2025-04-01" },
  { name: "Commercial Law No. 17 of 1999", updated: "2025-03-20" },
  { name: "Investment Law No. 72 of 2017", updated: "2025-03-15" },
  { name: "Real Estate Registration Law", updated: "2025-03-10" },
  { name: "Penal Code No. 58 of 1937", updated: "2025-02-28" },
  { name: "Family Law Amendments 2021", updated: "2025-02-20" },
  { name: "Consumer Protection Law No. 181 of 2018", updated: "2025-02-15" },
  { name: "Intellectual Property Law No. 82 of 2002", updated: "2025-02-10" },
  { name: "Competition Law No. 3 of 2005", updated: "2025-01-30" },
];

const systemHealth = [
  { name: "RAG Engine", status: "Online", color: "bg-green-500" },
  { name: "OCR Agent (Arabic Nougat)", status: "Online", color: "bg-green-500" },
  { name: "Translation Agent", status: "Degraded", color: "bg-yellow-500" },
  { name: "OpenAI Failover", status: "Standby", color: "bg-green-500" },
];

export default function Admin() {
  const { language } = useAppContext();
  const [pendingLawyers, setPendingLawyers] = useState(initPendingLawyers);
  const [users, setUsers] = useState(initUsers);
  const [syncing, setSyncing] = useState<string | null>(null);

  const tx = {
    en: {
      title: "Admin Control Panel",
      stats: [
        { label: "Total Users", value: "1,247", icon: Users },
        { label: "Pending Verifications", value: pendingLawyers.length.toString(), icon: Clock },
        { label: "Active Chats Today", value: "43", icon: MessageSquare },
        { label: "Docs Processed", value: "8,921", icon: FileText },
      ],
      pending_title: "Pending Lawyer Approvals",
      name: "Name", syndicate: "Syndicate ID", specialty: "Specialty", submitted: "Submitted", actions: "Actions",
      approve: "Approve", reject: "Reject",
      users_title: "User Management",
      email: "Email", role: "Role", residency: "Residency", joined: "Joined", ban: "Ban", unban: "Unban",
      health_title: "System Health",
      kb_title: "Knowledge Base (22 Datasets)",
      last_updated: "Last Updated", sync: "Sync",
      syncing: "Syncing...",
    },
    ar: {
      title: "لوحة تحكم الإدارة",
      stats: [
        { label: "إجمالي المستخدمين", value: "1,247", icon: Users },
        { label: "انتظار التحقق", value: pendingLawyers.length.toString(), icon: Clock },
        { label: "المحادثات النشطة اليوم", value: "43", icon: MessageSquare },
        { label: "المستندات المعالجة", value: "8,921", icon: FileText },
      ],
      pending_title: "طلبات توثيق المحامين",
      name: "الاسم", syndicate: "رقم النقابة", specialty: "التخصص", submitted: "تاريخ التقديم", actions: "الإجراءات",
      approve: "قبول", reject: "رفض",
      users_title: "إدارة المستخدمين",
      email: "البريد الإلكتروني", role: "الدور", residency: "الإقامة", joined: "تاريخ الانضمام", ban: "حظر", unban: "إلغاء الحظر",
      health_title: "صحة النظام",
      kb_title: "قاعدة المعرفة (22 مجموعة بيانات)",
      last_updated: "آخر تحديث", sync: "مزامنة",
      syncing: "جارٍ المزامنة...",
    }
  }[language];

  const handleSync = (name: string) => {
    setSyncing(name);
    setTimeout(() => setSyncing(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-1">{tx.title}</h1>
            <p className="text-muted-foreground text-sm">{language === 'en' ? 'Manage users, verify lawyers, and monitor system health.' : 'إدارة المستخدمين والتحقق من المحامين ومراقبة صحة النظام.'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tx.stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5" data-testid={`admin-stat-${i}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center"><s.icon className="h-4 w-4 text-secondary" /></div>
                </div>
                <p className="text-2xl font-bold text-secondary">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Pending Lawyers */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border"><h2 className="font-semibold text-foreground">{tx.pending_title}</h2></div>
            {pendingLawyers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{language === 'en' ? 'No pending applications.' : 'لا توجد طلبات معلقة.'}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50">
                    {[tx.name, tx.syndicate, tx.specialty, tx.submitted, tx.actions].map(h => (
                      <th key={h} className="text-start p-4 font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {pendingLawyers.map(l => (
                      <tr key={l.id} className="border-t border-border hover:bg-muted/30" data-testid={`pending-lawyer-${l.id}`}>
                        <td className="p-4 font-medium text-foreground">{l.name}</td>
                        <td className="p-4 text-muted-foreground font-mono text-xs">{l.syndicateId}</td>
                        <td className="p-4"><span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">{l.specialty}</span></td>
                        <td className="p-4 text-muted-foreground">{l.submitted}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" className="h-7 gap-1 text-xs bg-green-600 hover:bg-green-700 text-white" onClick={() => setPendingLawyers(p => p.filter(x => x.id !== l.id))} data-testid={`button-approve-${l.id}`}><Check className="h-3 w-3" />{tx.approve}</Button>
                            <Button size="sm" variant="outline" className="h-7 gap-1 text-xs border-destructive text-destructive hover:bg-destructive/10" onClick={() => setPendingLawyers(p => p.filter(x => x.id !== l.id))} data-testid={`button-reject-${l.id}`}><X className="h-3 w-3" />{tx.reject}</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* User Management */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border"><h2 className="font-semibold text-foreground">{tx.users_title}</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-muted/50">
                  {[tx.name, tx.email, tx.role, tx.residency, tx.joined, tx.actions].map(h => (
                    <th key={h} className="text-start p-4 font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className={`border-t border-border hover:bg-muted/30 ${u.banned ? 'opacity-60' : ''}`} data-testid={`user-row-${u.id}`}>
                      <td className="p-4 font-medium text-foreground">{u.name}</td>
                      <td className="p-4 text-muted-foreground text-xs">{u.email}</td>
                      <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'Legal Professional' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>{u.role}</span></td>
                      <td className="p-4 text-muted-foreground text-xs">{u.residency}</td>
                      <td className="p-4 text-muted-foreground">{u.joined}</td>
                      <td className="p-4">
                        <Button size="sm" variant={u.banned ? "default" : "outline"} className={`h-7 text-xs ${u.banned ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-destructive text-destructive hover:bg-destructive/10'}`}
                          onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, banned: !x.banned } : x))}
                          data-testid={`button-ban-${u.id}`}>
                          {u.banned ? tx.unban : tx.ban}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border"><h2 className="font-semibold text-foreground">{tx.health_title}</h2></div>
              <div className="p-5 space-y-3">
                {systemHealth.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0" data-testid={`health-${i}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${s.color} ${s.status === 'Degraded' ? 'animate-pulse' : ''}`} />
                      <span className="text-sm text-foreground">{s.name}</span>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.status === 'Online' ? 'bg-green-100 text-green-800' : s.status === 'Degraded' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Base */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border"><h2 className="font-semibold text-foreground">{tx.kb_title}</h2></div>
              <div className="divide-y divide-border max-h-64 overflow-y-auto">
                {datasets.map((d, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3" data-testid={`dataset-${i}`}>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.last_updated}: {d.updated}</p>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs ms-3 shrink-0 gap-1" onClick={() => handleSync(d.name)} disabled={syncing === d.name} data-testid={`button-sync-${i}`}>
                      <RefreshCw className={`h-3 w-3 ${syncing === d.name ? 'animate-spin' : ''}`} />
                      {syncing === d.name ? tx.syncing : tx.sync}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
