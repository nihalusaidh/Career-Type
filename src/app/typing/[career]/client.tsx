"use client";

import { useState, useMemo, useCallback } from "react";
import { useTypingStore } from "@/store/typingStore";
import { TypingEngine } from "@/components/typing/TypingEngine";
import { TestTypeSelector } from "@/components/typing/TestTypeSelector";
import { SubCategorySelector } from "@/components/typing/SubCategorySelector";
import { careers } from "@/data/careers";
import { getRandomPassage } from "@/content/index";
import { getTimeFromTestType } from "@/lib/utils";
import type { TestType } from "@/types";

export function TypingPageClient({ careerId }: { careerId: string }) {
  const career = careers.find((c) => c.id === careerId);
  const store = useTypingStore();

  const [selectedSub, setSelectedSub] = useState(
    career?.subCategories[0]?.id ?? ""
  );
  const [testType, setTestType] = useState<TestType>(store.testType);
  const [passageKey, setPassageKey] = useState(0);

  const handleSubChange = useCallback((sub: string) => {
    setSelectedSub(sub);
    store.setSubCategory(sub);
    setPassageKey((k) => k + 1);
  }, [store]);

  const handleNewPassage = useCallback(() => {
    setPassageKey((k) => k + 1);
  }, []);

  const passage = useMemo(() => {
    return getRandomPassage(careerId, selectedSub);
  }, [careerId, selectedSub, passageKey]);

  const duration = getTimeFromTestType(testType, undefined);

  if (!career) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[var(--ct-text-secondary)]">Career not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--ct-text)]">
          {career.name} Typing Practice
        </h1>
        <p className="text-sm text-[var(--ct-text-secondary)]">
          {career.description}
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <SubCategorySelector
          careerId={careerId}
          selectedSub={selectedSub}
          onSelect={handleSubChange}
        />
        <TestTypeSelector
          selected={testType}
          onSelect={(type) => {
            setTestType(type);
            store.setTestType(type);
          }}
        />
      </div>

      <TypingEngine
        key={`${selectedSub}-${passageKey}`}
        passage={passage}
        careerId={careerId}
        subId={selectedSub}
        testType={testType}
        duration={duration}
        onNewPassage={handleNewPassage}
      />
    </div>
  );
}
