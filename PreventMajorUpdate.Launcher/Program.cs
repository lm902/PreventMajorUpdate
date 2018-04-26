using System.Diagnostics;
using System.Windows.Forms;

namespace PreventMajorUpdate.Launcher
{
    static class Program
    {
        /// <summary>
        /// 應用程式的主要進入點。
        /// </summary>
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            var startInfo = new ProcessStartInfo("node.exe", "app.min.js");
            startInfo.CreateNoWindow = true;
            Process.Start(startInfo).WaitForExit();
            MessageBox.Show("已阻止 Windows 大版本更新的安装。\r\nPrevented Windows from installing major release updates.", "完成", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
