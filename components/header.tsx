"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLoginModal } from "@/components/admin-login-modal"

interface HeaderProps {
  currentPage: string
  onNavigate: (page: any) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const router = useRouter()
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
    setIsAdminAuthenticated(Boolean(token))

    const onStorage = (e: StorageEvent) => {
      if (e.key === "adminToken") {
        setIsAdminAuthenticated(Boolean(e.newValue))
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setIsAdminAuthenticated(false)
  }
  const navItems = [
    { href: "home", label: "Home" },
    { href: "academics", label: "Academics" },
    { href: "hostel", label: "Hostel" },
    { href: "support", label: "Support" },
    { href: "about", label: "About" },
  ]

  return (
    <header>
      <div className="brand">
        <div className="logo">
          <Image src="/catalyst-logo.png" alt="Catalyst Logo" width={80} height={50} priority />
        </div>
        <div>
          <div className="title">Catalyst</div>
          <div className="subtitle">IIIT Nagpur Student Portal</div>
        </div>
      </div>

      <nav role="navigation" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => onNavigate(item.href)}
            className={`nav-link ${currentPage === item.href ? "active" : ""}`}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.9)",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "10px",
              transition: "all 0.18s",
              fontWeight: 600,
              cursor: "pointer",
              ...(currentPage === item.href && {
                background: "linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02))",
                boxShadow: "0 6px 18px rgba(13, 10, 30, 0.3)",
              }),
            }}
          >
            {item.label}
          </button>
        ))}
        <Link
          href="/notifications"
          style={{
            background: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            color: "rgba(255, 255, 255, 0.9)",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "10px",
            transition: "all 0.18s",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Notifications
        </Link>
        {isAdminAuthenticated ? (
          <>
            <Link
              href="/admin"
              style={{
                background: "linear-gradient(90deg, rgba(108, 92, 231, 0.2), rgba(45, 156, 219, 0.2))",
                border: "1px solid rgba(108, 92, 231, 0.3)",
                color: "rgba(255, 255, 255, 0.9)",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "10px",
                transition: "all 0.18s",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(90deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                color: "rgba(255, 255, 255, 0.9)",
                padding: "8px 12px",
                borderRadius: "10px",
                transition: "all 0.18s",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            style={{
              background: "linear-gradient(90deg, rgba(108, 92, 231, 0.2), rgba(45, 156, 219, 0.2))",
              border: "1px solid rgba(108, 92, 231, 0.3)",
              color: "rgba(255, 255, 255, 0.9)",
              padding: "8px 12px",
              borderRadius: "10px",
              transition: "all 0.18s",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        )}
      </nav>

      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setIsAdminAuthenticated(true)
          router.push("/admin")
        }}
      />
    </header>
  )
}
