<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/22/15
 * Time: 2:19 PM
 */

namespace Bux\AdvertiseBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class PollAdAnswer
 *
 * @package Bux\AdvertiseBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_advertise_poll_ad_answers")
 */
class PollAdAnswer
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\AdvertiseBundle\Entity\PollAd", inversedBy="answers")
     * @ORM\JoinColumn(name="question_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $question;

    /**
     * @ORM\Column(type="text")
     */
    protected $answer;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set answer
     *
     * @param string $answer
     *
     * @return PollAdAnswer
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;

        return $this;
    }

    /**
     * Get answer
     *
     * @return string 
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * Set question
     *
     * @param \Bux\AdvertiseBundle\Entity\PollAd $question
     *
     * @return PollAdAnswer
     */
    public function setQuestion(PollAd $question = null)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return \Bux\AdvertiseBundle\Entity\PollAd 
     */
    public function getQuestion()
    {
        return $this->question;
    }
}
