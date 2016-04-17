<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/22/15
 * Time: 2:40 PM
 */

namespace Bux\AdvertiseBundle\Form\Type\Poll;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class PollAdAnswersFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type\Poll
 */
class PollAdAnswersFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('answer', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\AdvertiseBundle\Entity\PollAdAnswer',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'poll_ad_answers_form_type';
    }
}