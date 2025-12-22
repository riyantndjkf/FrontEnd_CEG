"use client";

import React, { useState, useEffect } from "react";
import {
    Zap,
    Shield,
    Droplets,
    Wind,
    Heart,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Card Type Configuration
const CARD_TYPES = {
    STRONG_ACID: {
        id: "strong_acid",
        name: "Asam Kuat",
        color: "bg-red-600",
        icon: Zap,
        power: 8,
        effectiveness: { weak_acid: 1.5, strong_base: 0.5, weak_base: 1.2, neutral: 1 },
    },
    WEAK_ACID: {
        id: "weak_acid",
        name: "Asam Lemah",
        color: "bg-orange-500",
        icon: Droplets,
        power: 5,
        effectiveness: { strong_acid: 0.7, strong_base: 0.3, weak_base: 1.5, neutral: 1 },
    },
    STRONG_BASE: {
        id: "strong_base",
        name: "Basa Kuat",
        color: "bg-blue-600",
        icon: Shield,
        power: 8,
        effectiveness: { strong_acid: 0.5, weak_acid: 1.5, weak_base: 1.2, neutral: 1 },
    },
    WEAK_BASE: {
        id: "weak_base",
        name: "Basa Lemah",
        color: "bg-cyan-500",
        icon: Wind,
        power: 5,
        effectiveness: { strong_acid: 1.5, weak_acid: 0.3, strong_base: 0.7, neutral: 1 },
    },
    NEUTRAL: {
        id: "neutral",
        name: "Netral",
        color: "bg-gray-500",
        icon: Heart,
        power: 6,
        effectiveness: { strong_acid: 1, weak_acid: 1, strong_base: 1, weak_base: 1 },
    },
};

// Initialize player hand
const initializeHand = () => {
    const hand = [];
    let id = 0;

    // Add 2 strong acids
    for (let i = 0; i < 2; i++) {
        hand.push({
            id: `card_${id++}`,
            type: "strong_acid",
            ...CARD_TYPES.STRONG_ACID,
        });
    }

    // Add 2 weak acids
    for (let i = 0; i < 2; i++) {
        hand.push({
            id: `card_${id++}`,
            type: "weak_acid",
            ...CARD_TYPES.WEAK_ACID,
        });
    }

    // Add 2 strong bases
    for (let i = 0; i < 2; i++) {
        hand.push({
            id: `card_${id++}`,
            type: "strong_base",
            ...CARD_TYPES.STRONG_BASE,
        });
    }

    // Add 2 weak bases
    for (let i = 0; i < 2; i++) {
        hand.push({
            id: `card_${id++}`,
            type: "weak_base",
            ...CARD_TYPES.WEAK_BASE,
        });
    }

    // Add 1 neutral
    hand.push({
        id: `card_${id++}`,
        type: "neutral",
        ...CARD_TYPES.NEUTRAL,
    });

    return hand;
};

// Card Component
const GameCard = ({ card, isSelected, onClick, disabled = false }) => {
    const IconComponent = card.icon;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative w-20 h-28 rounded-lg transition-all duration-200
                ${card.color} p-2 flex flex-col items-center justify-center
                text-white font-bold text-center text-xs
                ${isSelected ? "ring-4 ring-yellow-400 scale-110" : ""}
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
                border-2 border-white/30 shadow-lg
            `}
        >
            <IconComponent className="w-6 h-6 mb-1" />
            <span className="text-[10px] leading-tight">{card.name}</span>
            <div className="mt-1 text-xs font-bold">{card.power}</div>
        </button>
    );
};

// Battle Arena Component
const BattleArena = ({ playerCard, opponentCard, battleResult, isWaiting }) => {
    return (
        <div className="flex-1 bg-gradient-to-b from-green-900/30 to-green-950/50 rounded-lg p-8 flex flex-col items-center justify-center border-2 border-green-600/30">
            <h2 className="text-white text-xl font-bold mb-8">Arena Pertarungan</h2>

            <div className="flex items-center justify-between w-full max-w-xs gap-4 mb-8">
                {/* Player Card */}
                <div className="flex flex-col items-center">
                    <div className="text-white text-sm font-bold mb-2">Kartu Anda</div>
                    {playerCard ? (
                        <div className={`${playerCard.color} p-4 rounded-lg border-2 border-white/50`}>
                            <playerCard.icon className="w-8 h-8 text-white mx-auto mb-2" />
                            <div className="text-white text-xs font-bold">{playerCard.power}</div>
                        </div>
                    ) : (
                        <div className="w-20 h-24 bg-gray-700 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
                            <span className="text-white/50 text-xs">Pilih Kartu</span>
                        </div>
                    )}
                </div>

                {/* VS */}
                <div className="text-white text-2xl font-bold">VS</div>

                {/* Opponent Card */}
                <div className="flex flex-col items-center">
                    <div className="text-white text-sm font-bold mb-2">Kartu Lawan</div>
                    {opponentCard ? (
                        <div className={`${opponentCard.color} p-4 rounded-lg border-2 border-white/50 opacity-75`}>
                            <opponentCard.icon className="w-8 h-8 text-white mx-auto mb-2" />
                            <div className="text-white text-xs font-bold">{opponentCard.power}</div>
                        </div>
                    ) : (
                        <div className="w-20 h-24 bg-gray-700 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
                            {isWaiting ? (
                                <Clock className="w-6 h-6 text-white/50 animate-spin" />
                            ) : (
                                <span className="text-white/50 text-xs">Menunggu...</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Battle Result */}
            {battleResult && (
                <div className={`
                    text-center p-4 rounded-lg font-bold
                    ${battleResult === "win" ? "bg-green-600/50 text-green-100" : battleResult === "lose" ? "bg-red-600/50 text-red-100" : "bg-gray-600/50 text-gray-100"}
                `}>
                    <div>
                        {battleResult === "win" && "✓ Anda Menang!"}
                        {battleResult === "lose" && "✗ Anda Kalah!"}
                        {battleResult === "draw" && "~ Seri"}
                    </div>
                </div>
            )}
        </div>
    );
};

// Team Info Component
const TeamInfo = ({ teamName, health, maxHealth, score }) => {
    const healthPercent = (health / maxHealth) * 100;

    return (
        <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-bold">{teamName}</h3>
                <span className="text-yellow-400 font-bold text-lg">{score}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden border border-gray-600">
                <div
                    className={`h-full transition-all duration-300 ${healthPercent > 50
                        ? "bg-green-500"
                        : healthPercent > 25
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                    style={{ width: `${healthPercent}%` }}
                />
            </div>
            <div className="text-xs text-gray-400 mt-1">
                {health}/{maxHealth} HP
            </div>
        </div>
    );
};

export default function ViewGame() {
    const [playerHand, setPlayerHand] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [playerCard, setPlayerCard] = useState(null);
    const [opponentCard, setOpponentCard] = useState(null);
    const [battleResult, setBattleResult] = useState(null);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [opponentHealth, setOpponentHealth] = useState(100);
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [gamePhase, setGamePhase] = useState("play"); // play, battle, waiting
    const [roundCount, setRoundCount] = useState(0);

    // Initialize game
    useEffect(() => {
        const hand = initializeHand();
        setPlayerHand(hand);
    }, []);

    // Simulate opponent playing a random card
    const opponentPlayCard = () => {
        const randomIndex = Math.floor(Math.random() * playerHand.length);
        const card = playerHand[randomIndex];
        return {
            ...card,
            power: card.power + Math.floor(Math.random() * 4) - 2, // Add some variance
        };
    };

    // Handle card play
    const handlePlayCard = (card) => {
        if (gamePhase !== "play") return;

        setPlayerCard(card);
        setSelectedCard(card.id);
        setGamePhase("waiting");

        // Simulate opponent playing
        setTimeout(() => {
            const oppCard = opponentPlayCard();
            setOpponentCard(oppCard);

            // Simulate battle delay
            setTimeout(() => {
                resolveBattle(card, oppCard);
            }, 800);
        }, 1500);
    };

    // Resolve battle outcome
    const resolveBattle = (pCard, oCard) => {
        // Calculate effectiveness multiplier
        const effectiveness =
            pCard.effectiveness?.[oCard.type] || 1;
        const playerFinalPower = pCard.power * effectiveness;
        const opponentFinalPower = oCard.power;

        let result, playerDamage, opponentDamage;

        if (playerFinalPower > opponentFinalPower) {
            result = "win";
            opponentDamage = Math.ceil(playerFinalPower - opponentFinalPower);
            playerDamage = 0;
            setPlayerScore((prev) => prev + 1);
        } else if (playerFinalPower < opponentFinalPower) {
            result = "lose";
            playerDamage = Math.ceil(opponentFinalPower - playerFinalPower);
            opponentDamage = 0;
            setOpponentScore((prev) => prev + 1);
        } else {
            result = "draw";
            playerDamage = 0;
            opponentDamage = 0;
        }

        setBattleResult(result);
        setPlayerHealth((prev) => Math.max(0, prev - playerDamage));
        setOpponentHealth((prev) => Math.max(0, prev - opponentDamage));

        // Remove played cards from hand
        const newHand = playerHand.filter((c) => c.id !== pCard.id);
        setPlayerHand(newHand);

        // Continue to next round
        setTimeout(() => {
            setRoundCount((prev) => prev + 1);
            setPlayerCard(null);
            setOpponentCard(null);
            setBattleResult(null);
            setSelectedCard(null);
            setGamePhase(newHand.length > 0 ? "play" : "ended");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Battle of ABN
                </h1>

                {/* Game Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-900/70 rounded-lg p-3 text-center border border-gray-700">
                        <div className="text-xs text-gray-400">ROUND</div>
                        <div className="text-2xl font-bold text-yellow-400">{roundCount + 1}</div>
                    </div>
                    <div className="bg-gray-900/70 rounded-lg p-3 text-center border border-gray-700">
                        <div className="text-xs text-gray-400">KARTU TERSISA</div>
                        <div className="text-2xl font-bold text-blue-400">{playerHand.length}</div>
                    </div>
                    <div className="bg-gray-900/70 rounded-lg p-3 text-center border border-gray-700">
                        <div className="text-xs text-gray-400">STATUS</div>
                        <div className="text-sm font-bold text-green-400 capitalize">
                            {gamePhase === "play" && "Giliran Anda"}
                            {gamePhase === "waiting" && "Menunggu..."}
                            {gamePhase === "ended" && "Selesai"}
                        </div>
                    </div>
                    <div className="bg-gray-900/70 rounded-lg p-3 text-center border border-gray-700">
                        <div className="text-xs text-gray-400">POIN</div>
                        <div className="text-xl font-bold text-white">
                            <span className="text-green-400">{playerScore}</span>
                            <span className="text-gray-500 mx-2">:</span>
                            <span className="text-red-400">{opponentScore}</span>
                        </div>
                    </div>
                </div>

                {/* Main Game Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Player Side */}
                    <div className="bg-gray-900/50 border border-blue-600/30 rounded-lg p-4">
                        <TeamInfo
                            teamName="Tim Anda"
                            health={playerHealth}
                            maxHealth={100}
                            score={playerScore}
                        />
                    </div>

                    {/* Battle Arena */}
                    <div className="lg:col-span-1">
                        <BattleArena
                            playerCard={playerCard}
                            opponentCard={opponentCard}
                            battleResult={battleResult}
                            isWaiting={gamePhase === "waiting"}
                        />
                    </div>

                    {/* Opponent Side */}
                    <div className="bg-gray-900/50 border border-red-600/30 rounded-lg p-4">
                        <TeamInfo
                            teamName="Tim Lawan"
                            health={opponentHealth}
                            maxHealth={100}
                            score={opponentScore}
                        />
                    </div>
                </div>

                {/* Player Hand */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-white font-bold mb-4">Tangan Anda</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {playerHand.length > 0 ? (
                            playerHand.map((card) => (
                                <GameCard
                                    key={card.id}
                                    card={card}
                                    isSelected={selectedCard === card.id}
                                    onClick={() => handlePlayCard(card)}
                                    disabled={gamePhase !== "play"}
                                />
                            ))
                        ) : (
                            <div className="text-gray-400 py-8">Tidak ada kartu tersisa</div>
                        )}
                    </div>
                </div>

                {/* Game Over */}
                {gamePhase === "ended" && (
                    <div className="mt-6 bg-gradient-to-r from-yellow-600/50 to-purple-600/50 border-2 border-yellow-500 rounded-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Permainan Selesai!</h2>
                        {playerScore > opponentScore ? (
                            <div className="text-green-400 text-xl font-bold">🎉 Anda Menang!</div>
                        ) : playerScore < opponentScore ? (
                            <div className="text-red-400 text-xl font-bold">Anda Kalah!</div>
                        ) : (
                            <div className="text-yellow-400 text-xl font-bold">Seri!</div>
                        )}
                        <Button
                            onClick={() => {
                                const hand = initializeHand();
                                setPlayerHand(hand);
                                setPlayerCard(null);
                                setOpponentCard(null);
                                setPlayerHealth(100);
                                setOpponentHealth(100);
                                setPlayerScore(0);
                                setOpponentScore(0);
                                setRoundCount(0);
                                setBattleResult(null);
                                setSelectedCard(null);
                                setGamePhase("play");
                            }}
                            className="mt-4"
                        >
                            Main Lagi
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
