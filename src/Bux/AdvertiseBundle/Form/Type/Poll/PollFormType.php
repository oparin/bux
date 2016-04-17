<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/22/15
 * Time: 4:54 PM
 */

namespace Bux\AdvertiseBundle\Form\Type\Poll;

use Bux\AdvertiseBundle\Entity\PollAd;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class PollFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type\Poll
 */
class PollFormType extends AbstractType
{
    private $ad;

    /**
     * @param PollAd $ad
     */
    public function __construct(PollAd $ad)
    {
        $this->ad = $ad;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $ad = $this->ad;
        $builder
            ->add('answers', 'entity', array(
                'class' => 'Bux\AdvertiseBundle\Entity\PollAdAnswer',
                'property'  => 'answer',
                'expanded'  => true,
                'mapped'    => false,
                'query_builder' => function(EntityRepository $er) use ($ad) {
                    return $er->createQueryBuilder('pa')
                        ->orderBy('pa.id', 'ASC')
                        ->where('pa.question = :ad')
                        ->setParameter('ad', $ad);
                }
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\AdvertiseBundle\Entity\PollAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'poll_form_type';
    }
}