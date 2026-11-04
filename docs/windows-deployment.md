# Windows / XAMPP 自動部署

正式網站目錄：`C:\xampp\www\content`。

流程為：`push main` → 現有 GitHub Actions build → 發布到 `gh-pages` → Windows 每 5 分鐘檢查並同步。排程也會在開機時執行，不需要登入 Windows。更新時間是 GitHub build 完成後的下一次排程，加上下載和複製時間。

這是主機主動下載公開的 `NYCU-MAPL/MAPL_website`，不需要 GitHub token、SSH 金鑰、Git、Node.js 或新增對外連接埠。正式網址、Apache、憑證、其他專案頁與 FileBrowser 的設定維持原樣。

## 在 Windows 主機設定一次

1. 將本專案的 `scripts/deploy` 資料夾複製到主機，例如下載資料夾；三個檔案必須放在一起：
   - `Install-MaplDeployment.ps1`
   - `Sync-MaplWebsite.ps1`
   - `MaplDeployment.psm1`
2. **以系統管理員身分**開啟 Windows PowerShell，切換到這個資料夾。
3. 執行：

   ```powershell
   powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Install-MaplDeployment.ps1 -TargetDirectory 'C:\xampp\www\content'
   ```

`ExecutionPolicy Bypass` 僅用於此次程序和已安裝的排程程序；安裝程式不會修改整台電腦的執行原則。安裝程式會先同步一次，成功後才建立 **MAPL Website Sync** 排程。既有網站必須已包含 `index.html`，避免誤指向 `www` 根目錄。

程式與狀態放在 `C:\ProgramData\MAPLWebsiteDeploy`，只允許 Administrators 與 SYSTEM 修改。排程以 SYSTEM 執行，開機即能工作。日後更新同步程式時，重新執行安裝程式即可；它不會從 GitHub 下載或執行新的部署程式碼。

## 確認已啟用

```powershell
Get-ScheduledTask -TaskName 'MAPL Website Sync'
Get-ScheduledTaskInfo -TaskName 'MAPL Website Sync'
Get-Content 'C:\ProgramData\MAPLWebsiteDeploy\data\deployment.log' -Tail 20
Get-Content 'C:\ProgramData\MAPLWebsiteDeploy\data\state.json'
```

`LastTaskResult` 應為 `0`。`state.json` 記錄最後成功部署的 `gh-pages` commit；沒有新版本時會直接跳過，也不重新下載整包網站。以 `https://mapl.cs.nycu.edu.tw/content/#/` 檢查正式站。

手動立即同步：

```powershell
Start-ScheduledTask -TaskName 'MAPL Website Sync'
```

## 更新和回復方式

- 下載鎖定同一個 commit 的 ZIP，檢查路徑、檔案類型、必要目錄，以及 HTML 引用的 JS/CSS 是否齊全。
- 只更新新版本提供的網站檔案，不刪除舊檔案，所以 `pages/papers`、舊 bundle 和其他既有下載連結會保留。`content` 以外的目錄不會被更新。
- 將會被覆寫的檔案先完整備份到私有的 `data/backups`，再逐檔核對 SHA-256 並替換；`index.html` 最後更新。
- 發生錯誤時會還原已覆寫的檔案。停電或程序中斷則在下次執行前恢復未完成的交易。新增的資源會保留，避免已開啟網頁的瀏覽器找不到 bundle。
- 備份位置會記錄在 log 與 `state.json`。備份不會自動刪除；可依空間狀況人工清理較舊的成功版本，但保留目前狀態引用的備份，並避開同步執行期間。

一般回退以 Git revert 後 push 為主，讓同一個流程部署舊版。若需在主機人工緊急還原，先停用排程，再從記錄的備份複製回相同相對路徑，最後才還原 `index.html`。

## 停用與排錯

```powershell
Disable-ScheduledTask -TaskName 'MAPL Website Sync'
# 恢復自動同步：
Enable-ScheduledTask -TaskName 'MAPL Website Sync'
```

若 GitHub 無法連線、API 暫時限流或下載失敗，原網站會保留並記錄錯誤，等待下一次排程重試。排程每次最多執行 15 分鐘，且不允許重疊執行。檢查主機能否連上 `api.github.com`、`github.com`、`codeload.github.com`，以及系統日期和 TLS 憑證是否正確；不應停用憑證驗證。

## 開發驗證

```powershell
powershell.exe -NoProfile -File .\tests\deployment\Run-Tests.ps1
```

測試使用獨立暫存目錄，涵蓋備份、舊 PDF 保留、其他目錄不受影響、遺失 bundle、錯誤路徑、部署中途寫入失敗和中斷後回復。GitHub 的 **Test Windows deployment** workflow 會在 Windows PowerShell 5.1 與 PowerShell 7 執行相同測試。

相關官方說明：[Windows 排程觸發條件](https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtasktrigger)、[註冊排程](https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/register-scheduledtask)、[GitHub commit API](https://docs.github.com/en/rest/commits/commits#get-a-commit)。
