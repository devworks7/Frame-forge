with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()
    
hook1 = """              >
                <Boxes size={14} />
                <span>Capabilities Studio</span>
              </button>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 font-mono text-[8px] text-white/50 leading-normal space-y-1">"""
          
print("Hook 1 exists:", hook1 in text)

hook2 = """          )}
        </div>
      </div>
      {saveSuccessMsg && ("""
      
print("Hook 2 exists:", hook2 in text)
