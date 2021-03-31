export const messages: Record<string, Record<string, string>> = {
    it: {
        welcomeTime: 'Benvenuto, oggi è il {quando, date, ::yyMMMM} e sono le ore {quando, date, ::HHmmss} ',
        voteNever: 'Credo che tu non abbia ancora votato',
        voteRecent: 'Uhm, hai votato circa {timer, plural, one {un secondo} other {# secondi}} fa',
        votePast: 'Hai già votato da un pezzo'
    },
    ar: {
        welcomeTime: 'مرحبًا ، اليوم هو {quando, date, ::yyyyMMMdd}',
        voteNever: 'أنت لم تصوت بعد ... ربما',
        voteRecent: 'لقد قمت بالتصويت قبل {timer, number} ثانية',
        votePast: 'لقد قمت بالتصويت منذ وقت طويل'
    },
    ja: {
        welcomeTime: 'ようこそ、今日は{quando, date, ::yyyyMMMdd}日です',
        voteNever: 'あなたはまだ投票していません...多分',
        voteRecent: '約{timer}秒前に投票しました',
        votePast: 'あなたはずっと前に投票しました',
    }
}
