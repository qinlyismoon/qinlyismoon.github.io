import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSettings } from "../../../context/AppSettingsContext";
import TryTaskList from "../TryTaskList";

// Override with VITE_LN_PROTOTYPE_URL for a local Leaf Note server.
// The app is laid out for a 390 × 844 phone. Render it at that size and
// scale the whole frame down to fit, so nothing reflows or gets squeezed.
const PHONE_W = 390;
const PHONE_H = 844;

const LIVE_BASE =
  import.meta.env.VITE_LN_PROTOTYPE_URL ||
  "https://qinlyismoon.github.io/leaf-note/";

const ROLES = {
  owner: {
    id: "owner",
    user: "maya",
    en: {
      label: "Owner · Maya",
      tasks: [
        "Open Hand off from Care.",
        "Pick one or two plants and send. Jordan’s email is already filled in.",
        "Switch to Caregiver to see the request arrive.",
      ],
    },
    zh: {
      label: "主人 · Maya",
      tasks: [
        "从 Care 打开 Hand off。",
        "勾选一两株植物，直接发送，Jordan 的邮箱已经填好。",
        "切到照料者视角，看请求有没有到。",
      ],
    },
  },
  caregiver: {
    id: "caregiver",
    user: "jordan",
    en: {
      label: "Caregiver · Jordan",
      tasks: [
        "Open Shared and accept the handoff request.",
        "Run a suggested check — leaves, then soil.",
        "Finish with a photo, then switch back to Owner to see the update.",
      ],
    },
    zh: {
      label: "照料者 · Jordan",
      tasks: [
        "打开 Shared，接受交接请求。",
        "做一次建议检查——先叶子，再土壤。",
        "附上照片完成，再切回主人看更新。",
      ],
    },
  },
};

function prototypeSrc(user) {
  const base = LIVE_BASE.endsWith("/") ? LIVE_BASE : `${LIVE_BASE}/`;
  const url = new URL(base);
  url.searchParams.set("user", user);
  url.searchParams.set("embed", "1");
  return url.toString();
}

/**
 * Live Leaf Note handoff — switch Owner / Caregiver outside the phone.
 */
export default function HandoffTry() {
  const { language } = useAppSettings();
  const lang = language === "zh" ? "zh" : "en";
  const [roleId, setRoleId] = useState("owner");
  const [nonce, setNonce] = useState(0);
  const phoneRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return undefined;
    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setScale(width / PHONE_W);
    };
    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const role = ROLES[roleId];
  const copy = role[lang];
  const src = useMemo(() => prototypeSrc(role.user), [role.user, nonce]);

  const labels =
    lang === "zh"
      ? { reset: "重新开始", view: "视角" }
      : { reset: "Start over", view: "Viewing as" };

  const switchRole = (id) => {
    setRoleId(id);
    setNonce((n) => n + 1);
  };

  const reset = () => {
    setNonce((n) => n + 1);
  };

  return (
    <div className="mm-widget mm-live ln-handoff">
      <div className="mm-live__side">
        <p className="mm-live__eyebrow">{labels.view}</p>
        <div className="ln-handoff__roles" role="tablist" aria-label={labels.view}>
          {Object.values(ROLES).map((entry) => {
            const active = entry.id === roleId;
            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`ln-handoff__role${active ? " is-active" : ""}`}
                onClick={() => switchRole(entry.id)}
              >
                {entry[lang].label}
              </button>
            );
          })}
        </div>
        <TryTaskList tasks={copy.tasks} />
        <button type="button" className="mm-live__reset" onClick={reset}>
          {labels.reset}
        </button>
      </div>
      <div
        className="mm-phone ln-handoff__phone"
        ref={phoneRef}
        style={{ "--ln-scale": scale }}
      >
        <iframe
          key={`${role.user}-${nonce}`}
          src={src}
          title={
            lang === "zh"
              ? `Leaf Note 原型 — ${copy.label}`
              : `Leaf Note prototype — ${copy.label}`
          }
          loading="lazy"
          className="mm-phone__frame ln-handoff__frame"
          width={PHONE_W}
          height={PHONE_H}
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
